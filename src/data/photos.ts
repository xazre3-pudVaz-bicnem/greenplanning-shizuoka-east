/**
 * サイトで使う写真。
 *
 * 使ってよいのは、本部チェックリスト「画像」のとおり次の2つだけです。
 *   - provided … 本部が使用可として提供・指定した画像（assets/provided → scripts/prepare-images.mjs）
 *   - own      … 静岡EASTで撮影し、使用許諾を得た写真
 * 本部公式サイト・他サイトから保存した画像は使いません。
 *
 * alt と credit には「写っているもの」と「誰の写真か」だけを書きます。
 * 静岡EASTの施工と確認できていない写真に、地域名や「静岡EASTの施工」と書かないこと
 * （本部チェックリスト「施工実績」）。
 */
export type PhotoSource = 'provided' | 'own';

export type PhotoData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: PhotoSource;
  /** 画面の写真の下に出す出典表記 */
  credit: string;
};

const PROVIDED = 'イメージ写真（グリーンプランニング本部提供）';

export const photos = {
  sceneGarden: {
    src: '/photos/scene-garden.jpg',
    width: 800,
    height: 600,
    alt: 'ウッドデッキと目隠しフェンスのあいだに人工芝を敷いた庭',
    source: 'provided',
    credit: PROVIDED,
  },
} satisfies Record<string, PhotoData>;

export type PhotoKey = keyof typeof photos;
