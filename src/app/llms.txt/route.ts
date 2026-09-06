import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, defaultDescription } from '@/lib/site';
import { shop } from '@/data/shop';
import { regions, areaPages } from '@/data/areas';
import { products } from '@/data/products';
import { guideLinks, serviceLinks } from '@/data/nav';
import { works } from '@/data/works';

export const dynamic = 'force-static';

/**
 * AIクローラー向けの要約（/llms.txt）。
 * 「誰が・どこで・何を・いくらで」を誤解の余地なく置いておくためのものです。
 * 内容は data/ 配下から作るので、サイト本文と食い違うことがありません。
 */
export function GET() {
  const url = (p: string) => absoluteUrl(p) ?? p;
  const posts = getAllPosts().slice(0, 20);

  const lines: string[] = [
    `# ${shop.name}`,
    '',
    `> ${defaultDescription}`,
    '',
    '## 基本情報',
    '',
    `- 店舗名: ${shop.name}`,
    `- 代表: ${shop.representative}`,
    `- 所在地: ${shop.address.full}`,
    `- 直通電話: ${shop.tel}（受付 ${shop.hours.label}）`,
    `- メール: ${shop.email}`,
    `- 公式Instagram: ${shop.instagram}`,
    `- 公式サイト: ${url('/')}`,
    `- 事業内容: ${shop.business.join('、')}`,
    `- 対応するお客様: ${shop.customers.join('、')}`,
    `- ブランド: ${shop.hq.name}（${shop.hq.url}）の加盟店。全国の品質基準・施工基準を共有`,
    `- 保証: ${shop.brandFacts.qualityWarrantyYears}年間の品質保証と${shop.brandFacts.workWarrantyYears}年間の施工保証（本部共通）`,
    `- 人工芝の耐用年数の目安: ${shop.brandFacts.durabilityYears}（本部公式）`,
    '',
    '## 対応エリア',
    '',
    ...regions.map((r) => `- ${r.label}: ${r.municipalities.join('、')}`),
    '',
    '## 参考価格（本部公式の施工例・2026年9月確認）',
    '',
    '- マンション専用庭: AmazingTurf 35mm、17㎡、下地は土・雑草、工期1日、約180,000円',
    '- 戸建ての庭: IslandGrass 35mm、12㎡、下地は土・砂利・デッキ下、工期1日、約140,000円',
    '- 屋上テラス: AmazingTurf 35mm、30㎡、下地はコンクリート、工期1日、約230,000円',
    '- 価格は面積・商品・下地・搬入条件で変わります。写真と広さから無料で概算見積りができます。',
    '',
    '## 商品（材料価格は㎡あたり・税込・施工料別）',
    '',
    ...products.map(
      (p) =>
        `- ${p.name}（${p.pile}）: ${p.catch}${p.prices ? '／' + p.prices.map((x) => `${x.variant} ${x.priceTaxIn}`).join('、') : ''}`,
    ),
    '',
    '## 施工事例（静岡EASTの一次情報）',
    '',
    ...works.map((w) => `- [${w.title}](${url(`/works/${w.slug}`)}): ${w.area}、${w.size}、施工前は${w.before}、工期${w.duration}、${w.products.join('・')}`),
    '',
    '## 主なページ',
    '',
    `- [トップ](${url('/')})`,
    ...serviceLinks.map((s) => `- [${s.label}](${url(s.href)})`),
    ...guideLinks.map((g) => `- [${g.label}](${url(g.href)})`),
    `- [施工事例](${url('/works')})`,
    `- [商品ラインナップ](${url('/products')})`,
    `- [対応エリア](${url('/area')})`,
    ...areaPages.map((a) => `- [${a.name}の人工芝施工](${url(`/area/${a.slug}`)})`),
    `- [静岡EASTについて・代表紹介](${url('/about')})`,
    `- [よくある質問](${url('/faq')})`,
    `- [写真で概算見積り](${url('/estimate')})`,
    `- [お問い合わせ](${url('/contact')})`,
  ];

  if (posts.length > 0) {
    lines.push('', '## 最近のコラム', '');
    for (const p of posts) {
      lines.push(`- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`);
    }
  }

  lines.push(
    '',
    '## 注意',
    '',
    'このサイトに書かれている施工事例は、グリーンプランニング静岡EASTの施工と確認できたものだけです。',
    '数値（施工実績件数・保証・耐用年数・価格）は本部公式サイトの掲載内容に基づきます。',
    `不明な点は店舗へ直接お問い合わせください（電話 ${shop.tel}／メール ${shop.email}）。`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
