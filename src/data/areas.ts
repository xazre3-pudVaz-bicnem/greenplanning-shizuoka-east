/**
 * 担当エリア。
 *
 * オーナー様の指定（2026年9月15日ヒアリング）により「静岡県東部・伊豆・静岡市」（shop.areaLabel）。
 * 東部・伊豆の市町の一覧は、この指定を受けて静岡県の区分どおりに並べています。
 *
 * 市町ごとの地域ページは作りません。
 * 地域の事情は、静岡EASTが実際の施工・相談の経験から書いた文章が用意できたときだけ載せます。
 */
export type RegionKey = 'east' | 'izu' | 'shizuoka';
export type Region = { key: RegionKey; label: string; municipalities: string[] };

export const regions: Region[] = [
  {
    key: 'east',
    label: '静岡県東部',
    municipalities: ['沼津市', '三島市', '富士宮市', '富士市', '御殿場市', '裾野市', '函南町', '清水町', '長泉町', '小山町'],
  },
  {
    key: 'izu',
    label: '伊豆',
    municipalities: ['熱海市', '伊東市', '下田市', '伊豆市', '伊豆の国市', '東伊豆町', '河津町', '南伊豆町', '松崎町', '西伊豆町'],
  },
  {
    key: 'shizuoka',
    label: '静岡市',
    municipalities: ['静岡市'],
  },
];

export const allMunicipalities = regions.flatMap((r) => r.municipalities);
