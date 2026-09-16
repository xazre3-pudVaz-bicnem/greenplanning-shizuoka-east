import type { PhotoKey } from '@/data/photos';

/**
 * 静岡EASTの施工事例。
 *
 * 載せるのは、静岡EASTが施工し、お客様の掲載許可を得た事例だけです。
 * 本部の施工実績はここに入れません（本部チェックリスト「施工実績」）。
 * 文章はオーナー様の回答を、誤字・語順の整理だけをして載せます。
 * 写真は静岡EASTで撮影したもの（photos.ts の source: 'own'）だけを使います。
 */
export type Work = {
  slug: string;
  /** 施工地域（公開してよい範囲。お客様が特定されない粒度） */
  area: string;
  place: string;
  size: string;
  /** お客様のご要望 */
  request: string;
  /** 使った人工芝（オーナー様に確認できたものだけ） */
  product?: string;
  /** 静岡EASTが工夫したこと */
  ingenuity: string;
  /** お客様の掲載許可。true のものだけを載せる */
  permission: boolean;
  /** 施工前・施工後などの写真。まだ届いていなければ空 */
  photos: { photo: PhotoKey; caption: string }[];
  /** 出典（いつ・どこで聞いたか） */
  source: string;
};

const allWorks: Work[] = [
  {
    slug: 'kannami-garden',
    area: '静岡県田方郡函南町',
    place: '戸建ての庭',
    size: '約15㎡',
    request:
      'もともと敷いてあった天然芝が剥げてしまい、表面が凸凹になっていました。フラットにして人工芝を敷き、お子さまとのサッカー練習がまたできるようにしたい、というご要望でした。',
    ingenuity:
      'もともと芝生のなかった配管口にも人工芝を施工し、全面をフラットな状態にして、今までよりもサッカーを楽しめる環境にしました。',
    product: 'アメイジングターフ',
    permission: true,
    photos: [
      { photo: 'kannamiGardenBefore', caption: '施工前' },
      { photo: 'kannamiGardenAfter', caption: '施工後' },
    ],
    source: 'オーナー様ヒアリング（2026年9月15日・16日）',
  },
];

export const works = allWorks.filter((w) => w.permission);

/** 見出し・タイトル用の短い地域名（「静岡県」を省く） */
export function workAreaShort(work: Work) {
  return work.area.replace(/^静岡県/, '');
}

/** ページタイトル。事実（地域・場所・広さ）だけで組み立てる */
export function workTitle(work: Work) {
  return `${workAreaShort(work)}・${work.place}の人工芝施工事例（${work.size}）`;
}

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
