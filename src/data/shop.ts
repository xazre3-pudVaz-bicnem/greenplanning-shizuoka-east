/**
 * 店舗の基本情報（NAP）。
 * ここだけを直せば、ヘッダー・フッター・各ページ・構造化データ・llms.txt まで一度に反映されます。
 * 同じ値を他の場所に直接書かないこと（表記ゆれの原因になります）。
 *
 * 出典: 本部公式サイト https://greenplanning.jp/area/shizuoka-east/（2026年9月確認）
 */
export const shop = {
  /** 正式名称 */
  name: '人工芝専門店グリーンプランニング静岡EAST',
  /** 画面で使う短い呼び方 */
  shortName: 'グリーンプランニング静岡EAST',
  brand: 'グリーンプランニング',
  nameEn: 'GREEN PLANNING SHIZUOKA EAST',
  tagline: '静岡県東部・中部・伊豆の人工芝専門店',
  representative: '髙橋 祐子',
  representativeReading: 'たかはし ゆうこ',
  address: {
    postalCode: '410-0045',
    prefecture: '静岡県',
    city: '沼津市',
    line: '泉町16-6-903',
    full: '〒410-0045 静岡県沼津市泉町16-6-903',
    country: 'JP',
  },
  tel: '055-953-9777',
  telHref: 'tel:0559539777',
  /** 本部のフリーダイヤル（本部サイトに掲載されている共通窓口） */
  hqTel: '0120-39-9595',
  email: 'shizuoka-east@greenplanning.jp',
  hours: {
    label: '9:00〜17:00',
    open: '09:00',
    close: '17:00',
    /** 定休日は公式に明記されていないため、画面には出さない */
    note: '9:00〜17:00（メール・写真見積りは24時間受付）',
  },
  instagram: 'https://www.instagram.com/green_shizuoka/',
  instagramHandle: '@green_shizuoka',
  hq: {
    name: '人工芝専門店グリーンプランニング',
    url: 'https://greenplanning.jp/',
    eastPageUrl: 'https://greenplanning.jp/area/shizuoka-east/',
    worksUrl: 'https://greenplanning.jp/category/works/',
    lineupUrl: 'https://greenplanning.jp/lineup/',
    faqUrl: 'https://greenplanning.jp/faq/',
    operator: '株式会社グラント',
    operatorAddress: '大阪府交野市森北1-1-1-702',
  },
  /** 本部公式サイト掲載の数値（2026年9月確認）。更新時は本部サイトで再確認すること */
  brandFacts: {
    worksCount: '1,300件',
    totalArea: '40,000㎡',
    qualityWarrantyYears: 5,
    workWarrantyYears: 1,
    durabilityYears: '約7〜10年',
  },
  business: [
    '人工芝工事',
    '人工芝施工',
    '人工芝加工',
    '人工芝販売',
    '人工芝メンテナンス',
    '造園工事',
    '外構工事',
    'エクステリア',
  ],
  customers: [
    '個人住宅',
    '不動産会社',
    '外構・造園工事会社',
    '教育施設',
    'スポーツ施設',
    '市町村・公共関連',
    '商業施設',
  ],
  /** Googleマップ埋め込み（住所検索）。APIキー不要 */
  mapEmbedSrc:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('静岡県沼津市泉町16-6') +
    '&z=15&output=embed&hl=ja',
  mapLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('静岡県沼津市泉町16-6-903'),
} as const;

export type Shop = typeof shop;
