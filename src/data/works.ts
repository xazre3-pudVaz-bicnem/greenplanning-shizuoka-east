import type { PhotoKey } from '@/data/photos';

/**
 * 施工事例（一次情報）。
 *
 * ここに載せるのは、グリーンプランニング静岡EASTの施工と確認できた事例だけです。
 * 架空の事例・確認できていない地域の事例は絶対に足さないこと。
 * 事実（地域・面積・下地・工期・商品）は本部公式サイトの施工実績ページから取り、
 * 文章はこのサイト独自に書いています。
 *
 * 新しい事例を足すときは、写真を public/photos に置いて data/photos.ts に登録し、
 * ここに1件追加すれば、一覧・詳細・カテゴリ・sitemap・エリアページに反映されます。
 */
export type WorkCategory =
  | 'garden'
  | 'dogrun'
  | 'golf'
  | 'mansion'
  | 'balcony'
  | 'rooftop'
  | 'parking'
  | 'entrance'
  | 'facility';

export const workCategories: Record<WorkCategory, string> = {
  garden: '庭',
  dogrun: 'ドッグラン',
  golf: 'ゴルフ',
  mansion: 'マンション',
  balcony: 'ベランダ',
  rooftop: '屋上',
  parking: '駐車場',
  entrance: '玄関',
  facility: '施設',
};

export const workCategoryKeys = Object.keys(workCategories) as WorkCategory[];

export type Work = {
  slug: string;
  title: string;
  category: WorkCategory;
  /** 公開日（本部サイトの掲載日） */
  date: string;
  /** 施工地域（市区町村・郡まで） */
  area: string;
  /** 施工場所の種類 */
  place: string;
  size: string;
  before: string;
  duration: string;
  products: string[];
  /** 施工前の悩み（確認できている範囲で） */
  concern: string[];
  /** 提案内容 */
  proposal: string[];
  /** 施工工程（一般的な工程の説明。現場固有の断定はしない） */
  process: string[];
  /** 施工後 */
  result: string[];
  photoBefore: PhotoKey;
  photoAfter: PhotoKey;
  gallery: { photo: PhotoKey; caption: string }[];
  /** 関連する用途ページ・ガイドページ */
  related: { href: string; label: string }[];
  hqUrl?: string;
  description: string;
};

export const works: Work[] = [
  {
    slug: 'tagata-natural-to-amazing',
    title: '田方郡の戸建て｜天然芝の庭をアメイジングターフ35mm＋ジオフィルへ',
    category: 'garden',
    date: '2026-08-23',
    area: '静岡県田方郡',
    place: '戸建て住宅の庭',
    size: '13㎡',
    before: '天然芝',
    duration: '1日',
    products: ['アメイジングターフ 35mm', '人工芝充填材ジオフィル'],
    concern: [
      '天然芝は見た目がきれいな一方で、芝刈り・水やり・雑草取りが欠かせず、手入れが追いつかなくなっていました。',
      '芝がまばらになり、土が見える部分が増えて、庭に出る機会が減っていました。',
    ],
    proposal: [
      '一年を通して緑の状態を保てる人工芝への張り替えをご提案しました。',
      '密度が高く、踏み心地の柔らかいアメイジングターフ35mmを選び、根元には天然ヤシ100%の充填材ジオフィルを入れて、芝の立ち上がりとクッション性、夏の表面温度の抑制まで考えた仕様にしました。',
    ],
    process: [
      '既存の天然芝と根を取り除き、地面の高さをそろえます（不陸調整）。',
      '転圧して下地を締め固め、雑草を抑える防草シートを敷きます。',
      '人工芝を敷き込み、継ぎ目が目立たないように芝目をそろえ、端部をピンで固定します。',
      '仕上げにジオフィルを充填し、ブラッシングで芝を立たせて完成です。',
    ],
    result: [
      '13㎡の庭が1日で緑の空間に変わりました。芝刈りや水やりの手間がなくなり、雨のあとも土がぬかるみません。',
      '建物の際やエアコン室外機まわりまで人工芝を納め、隙間から雑草が出にくい仕上がりにしています。',
    ],
    photoBefore: 'workTagataBefore',
    photoAfter: 'workTagataAfter',
    gallery: [
      { photo: 'workTagataBefore', caption: '施工前。天然芝がまばらになり、土が露出している' },
      { photo: 'workTagataAfter', caption: '施工後。アメイジングターフ35mmとジオフィルで仕上げた庭' },
      { photo: 'workTagataApproach', caption: '玄関まわり。駐車場の脇にも人工芝を施工' },
    ],
    related: [
      { href: '/natural-grass', label: '天然芝から人工芝へ' },
      { href: '/garden', label: '戸建ての庭の人工芝' },
      { href: '/products/amazing-turf', label: 'アメイジングターフ' },
      { href: '/products/geofill', label: '人工芝充填材ジオフィル' },
      { href: '/area/izu', label: '伊豆地域の人工芝施工' },
    ],
    hqUrl: 'https://greenplanning.jp/works/garden/7280/',
    description:
      '静岡県田方郡の戸建て住宅で、手入れが追いつかなくなった天然芝の庭（13㎡）をアメイジングターフ35mmと充填材ジオフィルで人工芝に張り替えた施工事例。工期1日。施工前の悩み・提案・工程・ビフォーアフター写真。',
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

export function getWorksByCategory(category: WorkCategory) {
  return works.filter((w) => w.category === category);
}

/** 用途ページから関連事例を引く（カテゴリ一致 → その他） */
export function getWorksFor(categories: WorkCategory[], limit = 3) {
  const hit = works.filter((w) => categories.includes(w.category));
  const rest = works.filter((w) => !hit.includes(w));
  return [...hit, ...rest].slice(0, limit);
}
