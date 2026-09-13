import { shop } from '@/data/shop';

/**
 * 本番URL。未設定のときは null を返し、canonical / OG / sitemap を出さず
 * robots.txt を Disallow にします。
 *
 * 本番へ出すときは、環境変数 NEXT_PUBLIC_SITE_URL に
 * https://example.com のような「オリジンだけ」を設定してください。
 */
export const siteUrl: string | null = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
})();

export const isPublic = siteUrl !== null;

/**
 * 一般公開（検索エンジンへのインデックスと、Basic認証の解除）をしてよいか。
 *
 * 既定は「しない」。公開するには次のすべてが必要です（src/lib/publish-guard.ts）。
 *   - NEXT_PUBLIC_SITE_URL（本番URL）
 *   - NEXT_PUBLIC_ALLOW_INDEXING=true
 *   - HQ_APPROVAL_NOTE（本部の確認・承認の記録。例：2026-10-01 本部○○様メールにて承認）
 *   - shop.partnerCategory（本部指定のパートナー区分）が確定していること
 *   - 画面に「要確認」の項目が残っていないこと（components/ui/Pending.tsx）
 * 本部チェックリスト「公開・大幅変更」：公開前に本部の確認・承認を得る。
 *
 * これが false のときは、次のすべてを同時に効かせています。
 *   - Basic認証（src/proxy.ts）
 *   - 全ページの meta robots を noindex, nofollow
 *   - robots.txt を全面 Disallow
 *   - sitemap.xml を空にする
 *   - すべてのレスポンスに X-Robots-Tag: noindex, nofollow（next.config.ts と proxy.ts）
 */
export const allowIndexing = siteUrl !== null && process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() === 'true';

export function absoluteUrl(path = '/'): string | null {
  if (!siteUrl) return null;
  return new URL(path, siteUrl).toString();
}

/** OGなどで使うサイト名 */
export const siteName = shop.name;

/**
 * トップページのタイトル。
 * 本部チェックリスト「タイトル・H1・見出し・SEO」：現状は「静岡県の人工芝施工」の表現は可。
 * 他の加盟店が静岡県内に出店した場合は、担当エリアの表記に合わせて変更が必要です。
 */
export const homeTitle = `静岡県の人工芝施工｜${shop.areaLabel}｜${shop.shortName}`;

/** サイト共通のディスクリプション。店舗の事実だけで組み立てる */
export const defaultDescription = `${shop.name}（${shop.address.prefecture}${shop.address.city}）。担当エリアは${shop.areaLabel}。人工芝の施工・販売・メンテナンス、造園・外構工事のご相談は、電話・メール・フォームで受け付けています。`;

export const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || null;
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || null;
