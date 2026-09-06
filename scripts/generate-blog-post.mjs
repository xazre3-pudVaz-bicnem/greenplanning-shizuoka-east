#!/usr/bin/env node
/**
 * グリーンプランニング静岡EAST｜人工芝コラムの自動生成（1日1本）
 *
 * 実行は GitHub Actions からのみ。Vercel のビルド時・リクエスト時には走りません。
 * APIキーは環境変数から読み込みます（ソースには絶対に書かない）。
 *
 *   ANTHROPIC_API_KEY … 必須（GitHub Secrets から渡す）
 *   CLAUDE_MODEL      … 使用モデル。未設定なら claude-haiku-4-5
 *   DRY_RUN=1         … ファイルを書かずに標準出力へ
 *   DRY_RUN_FIXTURE=path.json … APIを呼ばず、JSONファイルを記事候補として検証だけ行う
 *
 * 生成された記事は content/blog/YYYY-MM-DD-slug.md に保存されます。
 *
 * 店舗・商品・価格の事実は src/data/verified-facts.json だけを正とします。
 * そこに無い事例・価格・性能は書かせません（検証で弾きます）。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

import { topics, categoryLinks, categoryPhotos, photoKeys, validPaths } from './topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const FACTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'verified-facts.json'), 'utf8'));

const MODEL = process.env.CLAUDE_MODEL?.trim() || process.env.ANTHROPIC_MODEL?.trim() || 'claude-haiku-4-5';
const DRY_RUN = process.env.DRY_RUN === '1';

/** 重複チェックでAIに渡す過去記事の本数 */
const HISTORY_SIZE = 50;

/* ───────────── ユーティリティ ───────────── */

function todayJst() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function readExistingPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const fm = /^---\n([\s\S]*?)\n---/.exec(raw);
      const get = (key) => {
        const m = fm ? new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(fm[1]) : null;
        return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
      };
      const body = fm ? raw.slice(fm[0].length) : raw;
      return { file: f, slug: get('slug'), title: get('title'), intent: get('intent'), category: get('category'), body };
    });
}

/** バイグラムの Dice 係数。既存記事と似すぎたタイトル・本文を弾く */
function similarity(a, b) {
  const grams = (s) => {
    const t = String(s).replace(/[\s　「」『』（）()・、。！？!?\-—]/g, '');
    const out = new Set();
    for (let i = 0; i < t.length - 1; i += 1) out.add(t.slice(i, i + 2));
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let hit = 0;
  for (const g of A) if (B.has(g)) hit += 1;
  return (2 * hit) / (A.size + B.size);
}

/** 3-gram の Dice 係数（本文用） */
function bodySimilarity(a, b) {
  const grams = (s) => {
    const t = String(s).replace(/[\s#*\[\]()\-|>]/g, '');
    const out = new Set();
    for (let i = 0; i < t.length - 2; i += 1) out.add(t.slice(i, i + 3));
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let hit = 0;
  for (const g of A) if (B.has(g)) hit += 1;
  return (2 * hit) / (A.size + B.size);
}

/** まだ書いていないトピックを選ぶ。直近の記事とカテゴリが続かないようにローテーションさせる */
function pickTopic(existing) {
  const usedIntents = new Set(existing.map((p) => p.intent).filter(Boolean));
  const unused = topics.filter((t) => !usedIntents.has(t.intent));
  if (unused.length === 0) return null;

  const recentCategories = existing.slice(-3).map((p) => p.category);
  const preferred = unused.filter((t) => !recentCategories.includes(t.category));
  const pool = preferred.length > 0 ? preferred : unused;

  const seed = Number(todayJst().replace(/-/g, ''));
  return pool[seed % pool.length];
}

function slugify(intent, category) {
  let h = 0;
  const src = String(intent);
  for (let i = 0; i < src.length; i += 1) h = (h * 31 + src.charCodeAt(i)) >>> 0;
  return `${category}-${h.toString(36)}`;
}

function escapeYaml(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/* ───────────── プロンプト ───────────── */

function buildSystemPrompt() {
  return `あなたは、静岡県沼津市の人工芝専門店「${FACTS.shop.shortName}」の公式サイトで、人工芝と庭について書くライターです。
読者は、静岡県東部・中部・伊豆で庭や人工芝のことを検索している一般の方です。

## この店について（ここにあることだけを事実として書いてよい）
${FACTS.facts.map((f) => `- ${f}`).join('\n')}

店舗情報:
- 店名: ${FACTS.shop.name}（文中では「${FACTS.shop.shortName}」または「静岡EAST」）
- 代表: ${FACTS.shop.representative}
- 住所: ${FACTS.shop.address}
- 電話: ${FACTS.shop.tel}／受付 ${FACTS.shop.hours}
- メール: ${FACTS.shop.email}
- 対応エリア: 東部（${FACTS.areas.east.join('・')}）／中部（${FACTS.areas.central.join('・')}）／伊豆（${FACTS.areas.izu.join('・')}）

## 絶対に書いてはいけないこと
${FACTS.forbidden.map((f) => `- ${f}`).join('\n')}

**「確認できていないことは書かない」が最優先のルールです。**
施工事例として書けるのは、田方郡の天然芝からの張り替え（13㎡・1日・アメイジングターフ35mm＋ジオフィル）だけです。
他の市町村について「施工しました」「ご依頼をいただきました」と書いてはいけません。
金額は、上のリストにある参考価格と材料価格だけを、そのままの数字で使ってください。それ以外の金額は書かないでください。
商品の性能・耐用年数・保証は、上のリストにある数字と表現の範囲で書き、「絶対に」「100%」「永久に」のような断定はしないでください。

## 一般論の書き方
人工芝・雑草・犬・ゴルフ・庭づくりの一般的な知識は自由に書いてかまいません。
ただし、断定を避けるべきところは「〜と言われています」「庭の条件によって違います」といった書き方にしてください。
法律・条例・補助金・保険については断定しないでください。
他社や他製品を名指しで貶めないでください。

## 文章のトーン
- 落ち着いていて、押しつけがましくない。読者の悩みに寄り添って、正直に答える。
- 大げさな広告コピーは使わない。「究極」「絶品」「No.1」「最安」のような表現は禁止。
- 一文は短く。60文字を目安に。
- 敬体（です・ます）で統一する。
- 「静岡 人工芝」のようなキーワードを何度も繰り返さない。自然に1〜2回で十分。
- 「当店」は使わない（「静岡EAST」または「${FACTS.shop.shortName}」）。

## 書き方の決まり
- 結論を最初に書く。冒頭の導入（150〜250字）で、質問に直接答える。
- 見出しは ## と ### のみ（# は使わない）。
- ## 見出しは4〜6本。それぞれの下に2〜3段落。
- 箇条書きは多くても3か所まで。表（| a | b |）は必要なら1つまで。
- 本文中に、指定された内部リンクを自然な文脈で必ず入れる。記法は [表示テキスト](/パス)。指定以外のパスへはリンクしない。
- 記事末尾に「## 店舗情報」「## まとめ」のような見出しは作らない（まとめは最後の段落で自然に書く）。
- 全体で1,500〜3,500字程度。文字数を稼ぐための繰り返しはしない。`;
}

function buildUserPrompt(topic, existing, related) {
  const links = categoryLinks[topic.category] ?? ['/artificial-grass', '/estimate'];
  const photos = categoryPhotos[topic.category] ?? photoKeys;
  const history = existing.slice(-HISTORY_SIZE);

  return `次の記事を書いてください。

- テーマ: ${topic.title}
- 想定している検索: 「${topic.intent}」
- 切り口: ${topic.angle}
- 本文に必ず入れる内部リンク（2〜3本）: ${links.join(' , ')}
${
  related.length > 0
    ? `- 本文に必ず入れる過去記事へのリンク（1本）: ${related.map((r) => `[${r.title}](/blog/${r.slug})`).join(' または ')}`
    : '- 過去記事へのリンクは、まだ記事が少ないため不要です。'
}
- eyecatch に指定できる写真キー（この中から1つだけ選ぶ）: ${photos.join(', ')}

すでに公開している記事（内容・タイトルが重ならないようにしてください）:
${history.length ? history.map((p) => `- ${p.title}（狙い: ${p.intent || '不明'}）`).join('\n') : '（まだありません）'}

次の形式のJSONだけを返してください。前後に説明文やコードフェンスを付けないでください。

{
  "title": "32文字以内。検索意図に沿い、具体的であること。店名を無理に入れない",
  "description": "90〜120文字。この記事を読むと何がわかるかを説明する",
  "tags": ["3〜5個", "日本語の短い語"],
  "eyecatch": "上の写真キーから1つ",
  "faq": [
    { "q": "この記事の内容に関する質問", "a": "確認できている事実の範囲で答える。60〜140文字" },
    { "q": "もう1つの質問", "a": "同上" }
  ],
  "body": "Markdown本文。## と ### の見出しを使う"
}`;
}

/* ───────────── 生成 ───────────── */

function extractJson(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONが見つかりませんでした');
  return JSON.parse(trimmed.slice(start, end + 1));
}

function countChars(md) {
  return String(md)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*>\-`|]/g, '')
    .replace(/\s/g, '').length;
}

/** 書いてよい金額（verified-facts に載っている数字だけ） */
const ALLOWED_PRICES = new Set(
  ['180000', '140000', '230000', '6050', '5500', '4950', '4500', '4290', '3900', '3630', '3300', '9680', '8800', '77000'].map((v) => v),
);

const MUNICIPALITIES = [...FACTS.areas.east, ...FACTS.areas.central, ...FACTS.areas.izu];

/** 事実に反する書き方を機械的に拾う */
const BANNED = [
  { re: /キャンペーン|割引|特典|期間限定|今なら|今だけ|先着/, msg: 'キャンペーン・割引・特典に触れています（告知は書けません）' },
  { re: /お客様の声|口コミ|評判|レビュー|喜んでいただ|感謝の言葉|大満足|ご好評/, msg: 'お客様の声・口コミ・評判を創作しています' },
  { re: /No\.?\s?1|ナンバーワン|日本一|静岡で一番|地域一番|最安|最高級|究極|絶品|随一|圧倒的/, msg: '根拠のない誇張表現があります' },
  { re: /絶対に|100[%％]|一切(生え|熱く|心配)|永久に|半永久|完全に(生え|防げ)/, msg: '安全性・耐久性・雑草・熱さについて断定しすぎています' },
  { re: /耐用年数は?\s*(1[1-9]|[2-9]\d)\s*年|(1[5-9]|[2-9]\d)年(以上)?(持ち|使え)/, msg: '本部公式にない耐用年数を書いています（目安は約7〜10年）' },
  { re: /補助金|助成金|保険が適用|条例で|法律で|建築基準法/, msg: '補助金・法律・保険について断定しています' },
  { re: /創業|設立|従業員|スタッフ\s*\d+|社員\s*\d+|売上/, msg: '会社の設立・人数・売上に触れています（確認できていません）' },
  { re: /臨時休業|定休日は|営業時間を変更|お盆休み|年末年始は/, msg: '営業日・休業の告知を書いています' },
  { re: /芝刈りサービス|除草剤の散布|草刈り代行|水道工事|屋根工事/, msg: '静岡EASTが行っていないサービスに触れています' },
  { re: /当店/, msg: '「当店」は使いません（「静岡EAST」または「グリーンプランニング静岡EAST」）' },
];

/** 施工事例の創作を弾く：市町村名と「施工しました／ご依頼」が同じ文にあり、田方郡でなければNG */
const CASE_VERB = /(施工しました|施工させていただ|施工いたしました|ご依頼(を)?いただ|お伺いしました|工事を行いました|施工した(お宅|お庭|事例)|施工例です)/;

function validate(article, existing, topic, related) {
  const errors = [];

  if (!article.title || typeof article.title !== 'string') errors.push('title がありません');
  if (article.title && article.title.length > 40) errors.push('title が長すぎます（40文字以内）');
  if (!article.description || String(article.description).length < 60) errors.push('description が短すぎます（90〜120文字）');
  if (String(article.description ?? '').length > 160) errors.push('description が長すぎます（120文字程度に）');
  if (!Array.isArray(article.tags) || article.tags.length < 2) errors.push('tags が足りません');
  if (!Array.isArray(article.faq) || article.faq.length < 2) errors.push('faq が2つ未満です');
  else if (article.faq.some((f) => !f || !f.q || !f.a)) errors.push('faq の q または a が空です');

  if (!photoKeys.includes(article.eyecatch)) errors.push(`eyecatch が写真キーの一覧にありません: ${article.eyecatch}`);

  const body = String(article.body ?? '');
  const length = countChars(body);
  if (length < 1300) errors.push(`本文が短すぎます（${length}字。1,500〜3,500字が目安）`);
  if (length > 4200) errors.push(`本文が長すぎます（${length}字。1,500〜3,500字が目安）`);

  if (/^#\s/m.test(body)) errors.push('本文に h1（#）が含まれています');

  const headings = body.match(/^##\s+/gm) ?? [];
  if (headings.length < 3) errors.push('## の見出しが3本未満です');
  if (/^##\s*(まとめ|店舗情報|お問い合わせ)/m.test(body)) errors.push('「まとめ」「店舗情報」の見出しは作りません');

  // サービス・事例・商品ページへの内部リンクが必ず要る
  const required = categoryLinks[topic.category] ?? [];
  if (!required.some((p) => body.includes(`](${p})`))) errors.push(`指定の内部リンク（${required.join(', ')}）が本文にありません`);

  if (related.length > 0 && !/\]\(\/blog\//.test(body)) errors.push('過去記事へのリンクが本文にありません');

  // 存在しないパスへリンクしていないか
  const valid = new Set([...validPaths, ...existing.map((p) => `/blog/${p.slug}`)]);
  for (const m of body.matchAll(/\]\((\/[^)\s#]*)/g)) {
    if (!valid.has(m[1])) {
      errors.push(`存在しないページへのリンクがあります: ${m[1]}`);
      break;
    }
  }
  if (/\]\(https?:\/\//.test(body)) errors.push('外部サイトへのリンクは入れません');

  // タイトルの重複・本文の類似
  for (const p of existing) {
    if (p.title && similarity(article.title, p.title) > 0.6) {
      errors.push(`既存記事「${p.title}」とタイトルが似すぎています`);
      break;
    }
  }
  for (const p of existing) {
    if (p.body && bodySimilarity(body, p.body) > 0.35) {
      errors.push(`既存記事「${p.title}」と本文が似すぎています`);
      break;
    }
  }

  const haystack = `${article.title}\n${article.description}\n${body}\n${(article.faq ?? []).map((f) => `${f?.q ?? ''}${f?.a ?? ''}`).join('\n')}`;
  for (const b of BANNED) {
    if (b.re.test(haystack)) errors.push(b.msg);
  }

  // 金額：許可リストにある数字だけ
  for (const m of haystack.matchAll(/([0-9０-９][0-9０-９,，.]*)\s*(万)?円/g)) {
    let num = m[1].replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/[,，]/g, '');
    if (m[2] === '万') num = String(Math.round(parseFloat(num) * 10000));
    if (!ALLOWED_PRICES.has(num)) {
      errors.push(`確認できていない金額を書いています: ${m[0]}（書けるのは参考価格と材料価格だけ）`);
      break;
    }
  }

  // 施工事例の創作
  for (const sentence of haystack.split(/[。\n]/)) {
    if (!CASE_VERB.test(sentence)) continue;
    const hasCity = MUNICIPALITIES.some((c) => sentence.includes(c)) || /[都道府県]([市区町村郡])/.test(sentence);
    if (hasCity && !sentence.includes('田方郡')) {
      errors.push(`「${sentence.trim().slice(0, 40)}」— 確認できていない施工事例を書いています`);
      break;
    }
  }

  return errors;
}

async function generate(client, topic, existing, related, attempt, feedback) {
  const messages = [{ role: 'user', content: buildUserPrompt(topic, existing, related) }];
  if (feedback) {
    messages.push({
      role: 'user',
      content: `前回の記事には次の問題がありました。修正して、同じJSON形式で書き直してください。\n${feedback.map((f) => `- ${f}`).join('\n')}`,
    });
  }

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    temperature: attempt === 0 ? 0.8 : 0.65,
    system: buildSystemPrompt(),
    messages,
  });

  const text = res.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');
  return extractJson(text);
}

/* ───────────── main ───────────── */

async function main() {
  // BLOG_DATE は検証用（DRY_RUN_FIXTURE と組み合わせて、日付を変えて動作確認するとき）
  const date = /^\d{4}-\d{2}-\d{2}$/.test(process.env.BLOG_DATE ?? '') ? process.env.BLOG_DATE : todayJst();
  const existing = readExistingPosts();

  if (existing.some((p) => p.file.startsWith(date))) {
    console.log(`${date} の記事はすでにあります。何もしません。`);
    return;
  }

  const topic = pickTopic(existing);
  if (!topic) {
    console.log('すべてのトピックを書き終えています。scripts/topics.mjs に追加してください。');
    return;
  }

  const related = existing
    .filter((p) => p.category === topic.category && p.slug)
    .slice(-2)
    .concat(existing.filter((p) => p.slug).slice(-1))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 2);

  console.log(`テーマ: ${topic.title}（${topic.category} ／ ${topic.intent}）`);
  console.log(`モデル: ${MODEL}`);

  const fixture = process.env.DRY_RUN_FIXTURE;
  let article = null;

  if (fixture) {
    const candidate = JSON.parse(fs.readFileSync(fixture, 'utf8'));
    const errors = validate(candidate, existing, topic, related);
    console.log(errors.length ? `検証NG: ${errors.join(' / ')}` : '検証OK');
    if (errors.length) process.exit(1);
    article = candidate;
  } else {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY が設定されていません。');
      process.exit(1);
    }
    const client = new Anthropic({ apiKey });

    let feedback = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const candidate = await generate(client, topic, existing, related, attempt, feedback);
        const errors = validate(candidate, existing, topic, related);
        if (errors.length === 0) {
          article = candidate;
          break;
        }
        console.warn(`検証に通りませんでした（${attempt + 1}回目）: ${errors.join(' / ')}`);
        feedback = errors;
      } catch (err) {
        console.warn(`生成に失敗しました（${attempt + 1}回目）: ${err.message}`);
        feedback = ['出力がJSONとして読み取れませんでした。JSONだけを返してください。'];
      }
    }
  }

  if (!article) {
    console.error('3回試しましたが、公開できる記事になりませんでした。今日は投稿しません。');
    process.exit(1);
  }

  const slug = slugify(topic.intent, topic.category);
  const filename = `${date}-${slug}.md`;
  const tags = article.tags
    .slice(0, 5)
    .map((t) => `"${escapeYaml(t)}"`)
    .join(', ');

  const faqYaml = article.faq
    .slice(0, 3)
    .map((f) => `  - q: "${escapeYaml(f.q)}"\n    a: "${escapeYaml(f.a)}"`)
    .join('\n');

  const frontmatter = [
    '---',
    `title: "${escapeYaml(article.title)}"`,
    `slug: "${slug}"`,
    `description: "${escapeYaml(article.description)}"`,
    `publishedAt: "${date}"`,
    `updatedAt: "${date}"`,
    `category: "${topic.category}"`,
    `intent: "${escapeYaml(topic.intent)}"`,
    `eyecatch: "${escapeYaml(article.eyecatch)}"`,
    `tags: [${tags}]`,
    'faq:',
    faqYaml,
    '---',
    '',
  ].join('\n');

  const content = `${frontmatter}${String(article.body).trim()}\n`;

  if (DRY_RUN) {
    console.log('--- DRY RUN ---');
    console.log(filename);
    console.log(content);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, filename), content, 'utf8');
  console.log(`書き出しました: content/blog/${filename}`);
  console.log(`タイトル: ${article.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
