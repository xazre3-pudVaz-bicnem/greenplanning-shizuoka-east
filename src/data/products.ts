import type { PhotoKey } from '@/data/photos';

/**
 * 静岡EASTが扱っている人工芝。
 *
 * 静岡EASTは本部と同じラインナップを扱っています（オーナー様に確認済み・2026年9月16日）。
 * 商品名を載せてよいことも確認済みです。
 *
 * ここに書いてよいのは次の2つだけです。
 *   - 商品名（本部公式サイトの表記どおり。2026年9月16日確認）
 *   - 静岡EASTがどんなお客様・場所に提案するか（オーナー様の言葉。届くまでは null ＝ 画面に「要確認」）
 *
 * 仕様・価格・保証・性能は本部の情報です。載せるときは本部の確認を取り、
 * 「本部公式情報」と分かる形にしてください（本部チェックリスト「実績・参考価格」）。
 * 本部サイトの商品説明をコピーしたり、AIで言い換えたりしないこと。
 *
 * 写真は本部提供の商品画像です。どの写真がどの商品かは、本部公式サイトの商品画像と
 * 照合して確認しました（2026年9月16日）。
 */
export type Product = {
  /** 本部公式サイトの表記 */
  name: string;
  photo: PhotoKey;
  /** 人工芝そのものか、施工に使う材料か */
  kind: 'turf' | 'material';
  /** 静岡EASTがどんなときに提案するか（オーナー様の言葉。未確認は null） */
  ownerNote: string | null;
};

export const products: Product[] = [
  {
    name: 'アメイジングターフ',
    photo: 'productAmazingTurf',
    kind: 'turf',
    ownerNote: '自宅のお庭で、わんちゃん用やお子さまのための人工芝としてご提案しています。',
  },
  { name: 'アメイジングターフ Lite', photo: 'productAmazingTurfLite', kind: 'turf', ownerNote: null },
  { name: 'アイランドグラス タイプＲ', photo: 'productIslandGrassR', kind: 'turf', ownerNote: null },
  { name: 'アイランドグラス タイプＣ', photo: 'productIslandGrassC', kind: 'turf', ownerNote: null },
  { name: 'アイランドグラス タイプＧ', photo: 'productIslandGrassG', kind: 'turf', ownerNote: null },
  { name: 'ゴルフグリーン用ターフ', photo: 'productGolfGreen', kind: 'turf', ownerNote: null },
  { name: '人工芝充填材 ジオフィル', photo: 'productGeofill', kind: 'material', ownerNote: null },
];

/** トップで大きく紹介する、いちばん多く使っている商品 */
export const mainProduct = products[0];

export const otherProducts = products.slice(1);
