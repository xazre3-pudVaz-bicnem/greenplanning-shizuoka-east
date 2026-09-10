import { shop } from '@/data/shop';

/**
 * 本番URL。未設定のときは null を返し、canonical / OG / sitemap を出さず
 * robots.txt を Disallow にします。
 * Vercel のプレビューURLが検索結果に出てしまう事故を構造的に防ぐためです。
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
 * 検索エンジンにインデックスさせてよいか。
 *
 * 既定は「させない」。インデックスさせるには、本番URL（NEXT_PUBLIC_SITE_URL）に加えて
 * NEXT_PUBLIC_ALLOW_INDEXING に true を明示する必要があります。
 *
 * 「うっかり公開」は検索結果から消すのに時間がかかる一方、「うっかり非公開」は
 * 環境変数を1つ足せば戻せます。取り返しのつく側を既定にしています。
 *
 * これが false のときは、次のすべてを同時に効かせています。
 *   - 全ページの meta robots を noindex, nofollow
 *   - robots.txt を全面 Disallow
 *   - sitemap.xml を空にする
 *   - すべてのレスポンスに X-Robots-Tag: noindex, nofollow（next.config.ts）
 *     → HTML以外（画像・RSS・llms.txt）も対象になります
 */
export const allowIndexing = siteUrl !== null && process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() === 'true';

export function absoluteUrl(path = '/'): string | null {
  if (!siteUrl) return null;
  return new URL(path, siteUrl).toString();
}

/** OGなどで使うサイト名 */
export const siteName = shop.name;

/** トップページのタイトル（60文字以内） */
export const homeTitle =
  '静岡県の人工芝施工専門店｜庭・ドッグラン・ゴルフ｜グリーンプランニング静岡EAST';

/** サイト共通のディスクリプション（トップページで使用・120文字前後） */
export const defaultDescription =
  '静岡県で人工芝施工ならグリーンプランニング静岡EAST。沼津・三島・富士・静岡市など静岡東部・中部・伊豆に対応。庭の雑草対策、愛犬用ドッグラン、自宅ゴルフ、マンション専用庭まで人工芝専門店がご提案。写真による概算見積りにも対応。';

export const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || null;
export const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() || null;
