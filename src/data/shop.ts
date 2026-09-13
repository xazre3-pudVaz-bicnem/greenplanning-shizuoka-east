/**
 * 店舗の基本情報（NAP）。
 * ここだけを直せば、ヘッダー・フッター・各ページ・構造化データ・llms.txt まで一度に反映されます。
 * 同じ値を他の場所に直接書かないこと（表記ゆれの原因になります）。
 *
 * ここに置くのは「静岡EASTに確認できた事実」だけです。
 * 本部公式の数値（施工件数・保証・参考価格など）は置きません。
 * 載せる場合は、本部の確認を取ったうえで「本部公式情報」と分かる形で表示してください。
 */
export const shop = {
  /** 正式名称 */
  name: '人工芝専門店グリーンプランニング静岡EAST',
  /** 画面で使う短い呼び方 */
  shortName: 'グリーンプランニング静岡EAST',
  /** 担当エリア（本部チェックリストの指定どおりの表記） */
  areaLabel: '静岡県東部・中部・伊豆',
  /**
   * 本部から指定されたパートナー区分の表記。
   * 本部チェックリスト「本部との関係性」により、代表挨拶・会社概要・店舗紹介に明記が必要です。
   * 正式な表記を静岡EAST（本部）に確認できるまで null のままにします。
   * null のあいだは画面に「要確認」と表示され、公開ビルドは失敗します。
   */
  partnerCategory: null as string | null,
  representative: '髙橋 祐子',
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
  email: 'shizuoka-east@greenplanning.jp',
  hours: {
    label: '9:00〜17:00',
    open: '09:00',
    close: '17:00',
  },
  instagram: 'https://www.instagram.com/green_shizuoka/',
  instagramHandle: '@green_shizuoka',
  /**
   * 本部。リンクは会社概要（/about の店舗情報の表）の1か所だけに置きます。
   * 本部チェックリスト「本部公式へのリンク」：全ページ共通部分（ヘッダー・フッター等）に置かない。
   */
  hq: {
    name: '人工芝専門店グリーンプランニング',
    url: 'https://greenplanning.jp/',
  },
  /** 事業内容（静岡EASTに最終確認すること） */
  business: ['人工芝工事', '人工芝施工', '人工芝加工', '人工芝販売', '人工芝メンテナンス', '造園工事', '外構工事', 'エクステリア'],
  /** Googleマップ埋め込み（住所検索）。APIキー不要 */
  mapEmbedSrc:
    'https://www.google.com/maps?q=' + encodeURIComponent('静岡県沼津市泉町16-6') + '&z=15&output=embed&hl=ja',
  mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('静岡県沼津市泉町16-6-903'),
};

export type Shop = typeof shop;
