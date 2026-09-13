import { absoluteUrl, defaultDescription } from '@/lib/site';
import { shop } from '@/data/shop';
import { regions } from '@/data/areas';
import { footerNav } from '@/data/nav';

export const dynamic = 'force-static';

/**
 * AIクローラー向けの要約（/llms.txt）。
 * 店舗の事実だけを data/ から組み立てます。本部の実績・価格・保証などは載せません。
 */
export function GET() {
  const url = (p: string) => absoluteUrl(p) ?? p;

  const lines: string[] = [
    `# ${shop.name}`,
    '',
    `> ${defaultDescription}`,
    '',
    '## 基本情報',
    '',
    `- 店舗名: ${shop.name}`,
    ...(shop.partnerCategory ? [`- 本部との関係: ${shop.hq.name}の${shop.partnerCategory}（本部直営店ではありません）`] : []),
    `- 代表: ${shop.representative}`,
    `- 所在地: ${shop.address.full}`,
    `- 電話: ${shop.tel}（受付 ${shop.hours.label}）`,
    `- メール: ${shop.email}`,
    `- Instagram: ${shop.instagram}`,
    `- 事業内容: ${shop.business.join('、')}`,
    '',
    `## 担当エリア（${shop.areaLabel}）`,
    '',
    ...regions.map((r) => `- ${r.label}: ${r.municipalities.join('、')}`),
    '',
    '## ページ',
    '',
    ...footerNav.map((l) => `- [${l.label}](${url(l.href)})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
