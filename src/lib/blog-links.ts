import type { BlogCategory } from '@/lib/blog';

/**
 * ブログのカテゴリごとに、記事末尾から必ず案内するサービス・事例・商品ページ。
 * 記事を孤立させず、「記事 → 用途ページ → 事例 → 見積り」の導線を保つためのもの。
 * scripts/topics.mjs の categoryLinks と同じ内容にしておくこと。
 */
export const blogCategoryLinks: Record<BlogCategory, { href: string; label: string }[]> = {
  basics: [
    { href: '/how-to-choose', label: '人工芝の選び方' },
    { href: '/products', label: '商品ラインナップ' },
    { href: '/artificial-grass', label: '静岡の人工芝施工' },
  ],
  shizuoka: [
    { href: '/area', label: '対応エリア' },
    { href: '/artificial-grass', label: '静岡の人工芝施工' },
    { href: '/works', label: '施工事例' },
  ],
  weed: [
    { href: '/weed-control', label: '雑草対策としての人工芝' },
    { href: '/garden', label: '戸建ての庭' },
    { href: '/price', label: '施工費用・価格' },
  ],
  dog: [
    { href: '/dogrun', label: '犬と暮らす庭・ドッグラン' },
    { href: '/products/geofill', label: '人工芝充填材ジオフィル' },
    { href: '/works', label: '施工事例' },
  ],
  golf: [
    { href: '/golf', label: '自宅ゴルフ・パターグリーン' },
    { href: '/products/golf-green', label: 'ゴルフグリーン用ターフ' },
    { href: '/estimate', label: '写真で概算見積り' },
  ],
  family: [
    { href: '/kids', label: '子どもが遊べる庭' },
    { href: '/garden', label: '戸建ての庭' },
    { href: '/products/island-grass-type-r', label: 'アイランドグラス タイプR' },
  ],
  construction: [
    { href: '/artificial-grass', label: '静岡の人工芝施工' },
    { href: '/drainage', label: '人工芝の水はけ' },
    { href: '/flow', label: '施工の流れ' },
  ],
  price: [
    { href: '/price', label: '施工費用・価格' },
    { href: '/estimate', label: '写真で概算見積り' },
    { href: '/works', label: '施工事例' },
  ],
  maintenance: [
    { href: '/maintenance', label: 'お手入れ・メンテナンス' },
    { href: '/lifespan', label: '人工芝は何年持つ？' },
    { href: '/faq', label: 'よくある質問' },
  ],
  diy: [
    { href: '/diy-vs-pro', label: 'DIYと業者施工の違い' },
    { href: '/products', label: '商品ラインナップ（材料のみの販売も）' },
    { href: '/price', label: '施工費用・価格' },
  ],
  area: [
    { href: '/area', label: '対応エリア' },
    { href: '/works', label: '施工事例' },
    { href: '/estimate', label: '写真で概算見積り' },
  ],
};
