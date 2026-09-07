/**
 * サイトで使う写真の一覧。実寸は scripts/prepare-images.mjs の出力から（CLS対策）。
 *
 * alt は「写っているもの」を書きます。
 * 静岡での施工と確認できている写真（work-tagata-* / east-work-*）にだけ地域名を入れ、
 * ブランド共通の写真に「静岡で施工」と書かないこと（虚偽のaltになります）。
 *
 * 出典: 本部公式サイト（greenplanning.jp）に掲載の、静岡EASTページ・施工事例・商品ページの写真。
 * AI生成風のイメージ画像（本部トップのメインビジュアル等）は使っていません。
 */
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** 静岡EASTの一次情報（施工写真・代表）か */
  east?: boolean;
};

export const photos = {
  /* ───────── 静岡EAST（一次情報） ───────── */
  workTagataBefore: {
    src: '/photos/work-tagata-before.jpg',
    width: 800,
    height: 600,
    alt: '静岡県田方郡の戸建て住宅、施工前の天然芝の庭。土が露出して芝がまばらになっている',
    east: true,
  },
  workTagataAfter: {
    src: '/photos/work-tagata-after.jpg',
    width: 800,
    height: 600,
    alt: '静岡県田方郡の戸建て住宅にグリーンプランニング静岡EASTが施工した人工芝（アメイジングターフ35mm）の庭',
    east: true,
  },
  workTagataApproach: {
    src: '/photos/work-tagata-approach.jpg',
    width: 800,
    height: 600,
    alt: '静岡県田方郡の住宅の玄関まわり。駐車場の脇に人工芝を施工した様子',
    east: true,
  },
  eastWorkInProgress: {
    src: '/photos/east-work-in-progress.jpg',
    width: 600,
    height: 400,
    alt: 'グリーンプランニング静岡EASTの施工の様子。既存の天然芝をはがして下地を整えている',
    east: true,
  },
  eastWorkAfter: {
    src: '/photos/east-work-after.jpg',
    width: 600,
    height: 400,
    alt: 'グリーンプランニング静岡EASTが施工した人工芝の庭。エアコン室外機まわりまできれいに納めている',
    east: true,
  },
  representative: {
    src: '/photos/representative-takahashi.jpg',
    width: 500,
    height: 500,
    alt: 'グリーンプランニング静岡EAST 代表 髙橋祐子。愛犬のフレンチブルドッグを抱いて笑顔で写る',
    east: true,
  },

  /* ───────── ブランド共通の施工写真 ───────── */
  gardenHouse: {
    src: '/photos/garden-house.jpg',
    width: 800,
    height: 600,
    alt: '青空の下、戸建て住宅の庭一面に敷かれた人工芝。建物とウッドフェンスに囲まれた芝のスペース',
  },
  mansionGarden: {
    src: '/photos/mansion-garden.jpg',
    width: 800,
    height: 600,
    alt: 'マンション専用庭に施工した人工芝。フェンス沿いに緑がまっすぐ整えられている',
  },
  balconyTerrace: {
    src: '/photos/balcony-terrace.jpg',
    width: 800,
    height: 600,
    alt: 'ベランダに敷いた人工芝。ルーバーフェンスと観葉植物のある明るいテラス',
  },
  dogrunPoodles: {
    src: '/photos/dogrun-poodles.jpg',
    width: 800,
    height: 600,
    alt: '人工芝のドッグランで遊ぶ2匹のトイプードル',
  },
  golfPuttingGreen: {
    src: '/photos/golf-putting-green.jpg',
    width: 800,
    height: 600,
    alt: '自宅の庭につくったゴルフ用人工芝のパターグリーン。カップとピンフラッグ、練習用ネット',
  },
  parkingStripes: {
    src: '/photos/parking-stripes.jpg',
    width: 800,
    height: 600,
    alt: 'コンクリートの駐車場に人工芝のラインを入れた施工例。玄関前のアプローチと合わせた仕上がり',
  },
  entranceApproach: {
    src: '/photos/entrance-approach.jpg',
    width: 800,
    height: 600,
    alt: '玄関アプローチの人工芝。自然石の飛び石と、肉球の形に切り抜いた飾りをあしらった施工例',
  },
  gardenFlowerbedWide: {
    src: '/photos/garden-flowerbed-wide.jpg',
    width: 1920,
    height: 840,
    alt: '人工芝の庭とレンガで縁取った花壇',
  },
  turfRollsWide: {
    src: '/photos/turf-rolls-wide.jpg',
    width: 1920,
    height: 840,
    alt: 'ロール状に巻かれた人工芝が並ぶ倉庫',
  },
  turfHandTouch: {
    src: '/photos/turf-hand-touch.jpg',
    width: 700,
    height: 700,
    alt: '高密度人工芝アメイジングターフの表面に手を置いて、芝の密度と柔らかさを確かめている',
  },

  /* ───────── Before / After ───────── */
  baHouseBefore: {
    src: '/photos/ba-house-before.jpg',
    width: 500,
    height: 300,
    alt: '施工前の戸建て住宅の庭。砂利と土、ウッドデッキ下が見えている',
  },
  baHouseAfter: {
    src: '/photos/ba-house-after.jpg',
    width: 500,
    height: 600,
    alt: '施工後の戸建て住宅の庭。ウッドデッキの脇まで人工芝（アイランドグラス35mm）を敷き詰めた',
  },
  baMansionBefore: {
    src: '/photos/ba-mansion-before.jpg',
    width: 500,
    height: 300,
    alt: '施工前のマンション専用庭。雑草が生い茂り土が露出している',
  },
  baMansionAfter: {
    src: '/photos/ba-mansion-after.jpg',
    width: 500,
    height: 600,
    alt: '施工後のマンション専用庭。人工芝（アメイジングターフ35mm）で雑草のない緑の空間に',
  },
  baRooftopBefore: {
    src: '/photos/ba-rooftop-before.jpg',
    width: 500,
    height: 300,
    alt: '施工前の屋上テラス。コンクリートのままの床面',
  },
  baRooftopAfter: {
    src: '/photos/ba-rooftop-after.jpg',
    width: 500,
    height: 600,
    alt: '施工後の屋上テラス。人工芝を敷き、山並みを望む緑の屋上に',
  },
  baWeedsBefore: {
    src: '/photos/ba-weeds-before.jpg',
    width: 500,
    height: 312,
    alt: '施工前のマンション専用庭。フェンス沿いに雑草が伸びている',
  },
  baWeedsAfter: {
    src: '/photos/ba-weeds-after.jpg',
    width: 500,
    height: 312,
    alt: '施工後のマンション専用庭。雑草を取り除き人工芝で整えたテラス前の芝',
  },
  baTerraceBefore: {
    src: '/photos/ba-terrace-before.jpg',
    width: 500,
    height: 312,
    alt: '施工前の屋上テラス。無機質なコンクリートの床',
  },
  baTerraceAfter: {
    src: '/photos/ba-terrace-after.jpg',
    width: 500,
    height: 312,
    alt: '施工後の屋上テラス。人工芝を敷いて過ごせる空間になった',
  },

  /* ───────── 商品 ───────── */
  productAmazingTurf: {
    src: '/photos/product-amazing-turf.jpg',
    width: 500,
    height: 280,
    alt: '高密度人工芝アメイジングターフ35mmの断面。C型パイルとクリンプパイルが密に立ち並ぶ',
  },
  productAmazingTurfLite: {
    src: '/photos/product-amazing-turf-lite.jpg',
    width: 500,
    height: 280,
    alt: 'アメイジングターフLite 25mmの断面',
  },
  productIslandGrassR: {
    src: '/photos/product-island-grass-r.jpg',
    width: 500,
    height: 280,
    alt: '国産人工芝アイランドグラス タイプRの断面。扁平な芝糸で柔らかな肌触り',
  },
  productIslandGrassC: {
    src: '/photos/product-island-grass-c.jpg',
    width: 500,
    height: 280,
    alt: '国産人工芝アイランドグラス タイプCの断面。C型断面で起立性に優れる',
  },
  productIslandGrassG: {
    src: '/photos/product-island-grass-g.jpg',
    width: 500,
    height: 280,
    alt: '国産人工芝アイランドグラス タイプG 10mmの断面。クリンプパイルの高密度設計',
  },
  productGolfGreen: {
    src: '/photos/product-golf-green.jpg',
    width: 500,
    height: 280,
    alt: 'ゴルフグリーン用ターフ13mmの表面。パター練習に適した高密度の短い芝',
  },
  productGeofill: {
    src: '/photos/product-geofill.jpg',
    width: 500,
    height: 280,
    alt: '人工芝充填材ジオフィルの構造図。天然ヤシ繊維の充填材を人工芝の根元に入れた断面',
  },

  /* ───────── 工場 ───────── */
  factoryTufting: {
    src: '/photos/factory-tufting.jpg',
    width: 500,
    height: 350,
    alt: '人工芝工場のタフティング工程。芝糸が基布に打ち込まれていく',
  },
  factoryBacking: {
    src: '/photos/factory-backing.jpg',
    width: 500,
    height: 350,
    alt: '人工芝工場のバッキング工程。裏面のコーティング作業',
  },
  factoryYarn: {
    src: '/photos/factory-yarn.jpg',
    width: 500,
    height: 350,
    alt: '人工芝工場に並ぶ芝糸のボビン',
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const photoKeys = Object.keys(photos) as PhotoKey[];

/**
 * 文字列から写真を引く。ブログのフロントマターなど、型で縛れない値のために用意しています。
 * 型で縛れる場所（services / guides / areas / products / works）は `PhotoKey` を使ってください。
 * 綴りを間違えたまま既定の写真に差し替わるのを防ぐため、開発時は警告を出します。
 */
export function getPhoto(key: string): Photo {
  const found = (photos as Record<string, Photo>)[key];
  if (!found && process.env.NODE_ENV !== 'production') {
    console.warn(`[photos] 写真キーが見つかりません: "${key}" — gardenHouse で代用します`);
  }
  return found ?? photos.gardenHouse;
}
