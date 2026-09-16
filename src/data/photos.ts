/**
 * サイトで使う写真。
 *
 * 使ってよいのは、本部チェックリスト「画像」のとおり次の2つだけです。
 *   - provided … 本部が使用可として提供・指定した画像（assets/provided → scripts/prepare-images.mjs）
 *   - own      … 静岡EASTで撮影し、使用許諾を得た写真（assets/own → scripts/prepare-images.mjs）
 * 本部公式サイト・他サイトから保存した画像は使いません。
 *
 * alt には「写っているもの」だけを書き、credit で「誰の写真か」を表示します。
 * 本部提供の写真に、地域名や「静岡EASTの施工」と書かないこと（本部チェックリスト「施工実績」）。
 * width / height は scripts/prepare-images.mjs の出力に合わせます。
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
const OWN_WORK = '写真：グリーンプランニング静岡EAST（お客様の許可を得て掲載）';

const PROVIDED_PRODUCT = '写真：グリーンプランニング本部提供';

const provided = (src: string, alt: string): PhotoData => ({ src, width: 800, height: 600, alt, source: 'provided', credit: PROVIDED });

export const photos = {
  sceneGarden: provided('/photos/scene-garden.jpg', 'ウッドデッキと目隠しフェンスのあいだに人工芝を敷いた庭'),
  sceneDogrun: provided('/photos/scene-dogrun.jpg', '人工芝の上でくつろぐ2匹の犬'),
  sceneGolf: provided('/photos/scene-golf.jpg', '住宅の庭に人工芝で作ったパッティンググリーン'),
  sceneBalcony: provided('/photos/scene-balcony.jpg', '黒い目隠しフェンスに囲まれた人工芝のスペース'),
  sceneRooftop: provided('/photos/scene-rooftop.jpg', 'タイルの通路沿いに人工芝を敷いたテラス'),
  sceneEntrance: provided('/photos/scene-entrance.jpg', '門柱から玄関ステップまでのスペースに人工芝を敷いた住宅'),
  sceneParking: provided('/photos/scene-parking.jpg', 'コンクリートの駐車スペースの目地に人工芝を入れた例'),

  productAmazingTurf: {
    src: '/photos/product-amazing-turf.jpg',
    width: 500,
    height: 280,
    alt: '人工芝の断面。緑の芝葉と、その根元の茶色い下葉',
    source: 'provided',
    credit: PROVIDED_PRODUCT,
  },
  representative: {
    src: '/photos/representative.jpg',
    width: 363,
    height: 350,
    alt: 'フレンチブルドッグを抱く代表の高橋 祐子',
    source: 'own',
    credit: '写真：グリーンプランニング静岡EAST',
  },
  kannamiGardenBefore: {
    src: '/photos/works/kannami-garden-before.jpg',
    width: 1200,
    height: 676,
    alt: '施工前の庭。天然芝が剥げて土が出ている',
    source: 'own',
    credit: OWN_WORK,
  },
  kannamiGardenAfter: {
    src: '/photos/works/kannami-garden-after.jpg',
    width: 1200,
    height: 676,
    alt: '施工後の庭。全面に人工芝を敷いてフラットに仕上げている',
    source: 'own',
    credit: OWN_WORK,
  },
} satisfies Record<string, PhotoData>;

export type PhotoKey = keyof typeof photos;

/** トップの写真ギャラリーに並べる本部提供のイメージ写真（ヒーローで使う sceneGarden は除く） */
export const galleryKeys: PhotoKey[] = ['sceneDogrun', 'sceneGolf', 'sceneEntrance', 'sceneParking', 'sceneBalcony', 'sceneRooftop'];
