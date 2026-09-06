/**
 * 記事本文用の軽量な Markdown → HTML 変換。
 * 生成される記事は書式が限られているので、外部ライブラリを足さずに済ませています
 * （JSを増やさないことが Core Web Vitals にそのまま効きます）。
 *
 * 入力は必ずエスケープしてから組み立てるので、生のHTMLは通しません。
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(src: string): string {
  let out = escapeHtml(src);
  // [text](href)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, href: string) => {
    const safe = /^(https?:\/\/|\/|tel:|mailto:)/.test(href) ? href : '#';
    const external = safe.startsWith('http');
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safe}"${attrs}>${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

/** 見出しからページ内リンク用のIDを作る */
export function slugifyHeading(text: string, index: number): string {
  const base = text
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return base ? `h-${index}-${base}`.slice(0, 64) : `h-${index}`;
}

export type Heading = { id: string; text: string; level: 2 | 3 };

export function renderMarkdown(md: string): { html: string; headings: Heading[] } {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  const headings: Heading[] = [];
  let para: string[] = [];
  let list: string[] | null = null;
  let olist: string[] | null = null;
  let quote: string[] | null = null;
  let table: string[][] | null = null;
  let hIndex = 0;

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(''))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list && list.length) html.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`);
    list = null;
    if (olist && olist.length) html.push(`<ol>${olist.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`);
    olist = null;
  };
  const flushQuote = () => {
    if (quote && quote.length) html.push(`<blockquote><p>${inline(quote.join(''))}</p></blockquote>`);
    quote = null;
  };
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...rows] = table;
      const th = head.map((c) => `<th>${inline(c)}</th>`).join('');
      const body = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');
      html.push(
        `<div class="table-scroll"><table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`,
      );
    }
    table = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
    flushTable();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      hIndex += 1;
      const level = heading[1].length === 2 ? 2 : 3;
      const text = heading[2].trim();
      const id = slugifyHeading(text, hIndex);
      headings.push({ id, text, level: level as 2 | 3 });
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    if (/^#\s+/.test(line)) {
      // 記事内の h1 は frontmatter の title に任せるので h2 へ落とす
      flushAll();
      hIndex += 1;
      const text = line.replace(/^#\s+/, '').trim();
      const id = slugifyHeading(text, hIndex);
      headings.push({ id, text, level: 2 });
      html.push(`<h2 id="${id}">${inline(text)}</h2>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushAll();
      html.push('<hr />');
      continue;
    }

    // 表（| a | b |）。区切り行（|---|---|）は読み飛ばす
    if (/^\s*\|.*\|\s*$/.test(line)) {
      flushPara();
      flushList();
      flushQuote();
      if (/^\s*\|\s*:?-{2,}/.test(line)) continue;
      const cells = line
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim());
      table ??= [];
      table.push(cells);
      continue;
    }

    const li = /^\s*[-*]\s+(.*)$/.exec(line);
    if (li) {
      flushPara();
      flushQuote();
      flushTable();
      if (olist) flushList();
      list ??= [];
      list.push(li[1]);
      continue;
    }

    const oli = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (oli) {
      flushPara();
      flushQuote();
      flushTable();
      if (list) flushList();
      olist ??= [];
      olist.push(oli[1]);
      continue;
    }

    const bq = /^\s*>\s?(.*)$/.exec(line);
    if (bq) {
      flushPara();
      flushList();
      flushTable();
      quote ??= [];
      quote.push(bq[1]);
      continue;
    }

    flushList();
    flushQuote();
    flushTable();
    // 日本語は行を連結するときに空白を入れない（半角スペースが混ざるため）
    para.push(line.trim());
  }

  flushAll();
  return { html: html.join('\n'), headings };
}

/** 一覧の抜粋用にプレーンテキスト化 */
export function toPlainText(md: string, max = 110): string {
  const text = md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*\|.*\|\s*$/gm, '')
    .replace(/[*>_`]/g, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** おおよその本文の長さ */
export function countCharacters(md: string): number {
  return toPlainText(md, Number.MAX_SAFE_INTEGER).replace(/\s/g, '').length;
}
