/**
 * ナビゲーション。用途ページ・ガイドページの一覧もここに持たせ、
 * ヘッダー・フッター・サイトマップで同じ順序を使います。
 */
export type NavLink = { href: string; label: string };

/** 用途別サービスページ（SEOランディングページ） */
export const serviceLinks: NavLink[] = [
  { href: '/artificial-grass', label: '人工芝施工（総合）' },
  { href: '/garden', label: '戸建ての庭' },
  { href: '/dogrun', label: '犬と暮らす庭・ドッグラン' },
  { href: '/golf', label: '自宅ゴルフ・パターグリーン' },
  { href: '/weed-control', label: '雑草対策' },
  { href: '/kids', label: '子どもが遊べる庭' },
  { href: '/mansion', label: 'マンション専用庭' },
  { href: '/balcony', label: 'ベランダ・テラス' },
  { href: '/parking', label: '駐車場・アプローチ' },
  { href: '/facility', label: '法人・店舗・施設' },
  { href: '/exterior', label: '人工芝＋外構工事' },
];

/** 検索意図別のガイドページ */
export const guideLinks: NavLink[] = [
  { href: '/price', label: '施工費用・価格' },
  { href: '/how-to-choose', label: '人工芝の選び方' },
  { href: '/diy-vs-pro', label: 'DIYと業者施工の違い' },
  { href: '/natural-grass', label: '天然芝から人工芝へ' },
  { href: '/maintenance', label: 'お手入れ・メンテナンス' },
  { href: '/lifespan', label: '人工芝は何年持つ？' },
  { href: '/drainage', label: '人工芝の水はけ' },
  { href: '/heat', label: '人工芝は夏に熱くなる？' },
];

/** ヘッダーの主要リンク */
export const mainNav: NavLink[] = [
  { href: '/works', label: '施工事例' },
  { href: '/artificial-grass', label: '人工芝でできること' },
  { href: '/products', label: '商品' },
  { href: '/price', label: '料金' },
  { href: '/area', label: '対応エリア' },
  { href: '/about', label: '静岡EASTについて' },
  { href: '/blog', label: 'コラム' },
];

export const companyLinks: NavLink[] = [
  { href: '/about', label: '静岡EASTについて' },
  { href: '/flow', label: '施工の流れ' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/estimate', label: '写真で概算見積り' },
  { href: '/privacy', label: '個人情報保護方針' },
];
