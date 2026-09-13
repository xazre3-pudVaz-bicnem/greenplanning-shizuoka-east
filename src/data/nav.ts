/**
 * ナビゲーション。ヘッダー・フッター・サイトマップで同じ順序を使います。
 *
 * 本部サイトと同じ分類（庭・ドッグラン・ゴルフ・マンション・ベランダ・商品・よくある質問 など）の
 * ページ構成にはしないこと（本部チェックリスト「コンテンツ」）。
 * ページを増やすときは、静岡EAST自身の経験・地域事情・施工事例をもとに、人が企画した内容にします。
 */
export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: '/about', label: '店舗情報' },
  { href: '/area', label: '担当エリア' },
  { href: '/contact', label: 'お問い合わせ' },
];

export const footerNav: NavLink[] = [
  { href: '/', label: 'トップ' },
  ...mainNav,
  { href: '/privacy', label: '個人情報保護方針' },
];
