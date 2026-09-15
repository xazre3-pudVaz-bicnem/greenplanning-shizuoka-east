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
    permission: true,
    photos: [
      { photo: 'kannamiGardenBefore', caption: '施工前' },
      { photo: 'kannamiGardenAfter', caption: '施工後' },
    ],
    source: 'オーナー様ヒアリング（2026年9月15日）',
  },
];

export const works = allWorks.filter((w) => w.permission);
