import type { PhotoKey } from '@/data/photos';

/**
 * 商品ラインナップ。
 * 仕様・価格は本部公式サイトの各商品ページから（2026年9月確認）。
 *   https://greenplanning.jp/lineup/
 * 価格は人工芝本体の材料価格（㎡あたり）で、カット加工料・施工料は別途です。
 * 本部サイトの価格改定があったら、ここを更新すること。
 *
 * 「どんな人に向いているか」はこのサイト独自の整理です。
 */
export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  series: 'Amazing Turf' | 'Island Grass' | 'Golf Green' | 'GeoFill';
  /** 一覧で使う一言 */
  catch: string;
  /** 芝丈 */
  pile: string;
  /** バッジ的な特長（本部表記） */
  features: string[];
  /** 向いている人・場所（独自の整理） */
  suitableFor: string[];
  /** 向いていない・注意 */
  notes?: string[];
  /** 商品説明（独自文） */
  body: string[];
  spec: { label: string; value: string }[];
  /** 材料価格（税別・税込）。施工料別 */
  prices?: { variant: string; price: string; priceTaxIn: string }[];
  photo: PhotoKey;
  hqUrl: string;
  /** 関連する用途ページ */
  relatedServices: string[];
  /** メタディスクリプション */
  description: string;
};

export const products: Product[] = [
  {
    slug: 'amazing-turf',
    name: 'アメイジングターフ',
    nameEn: 'Amazing Turf',
    series: 'Amazing Turf',
    catch: '134万本/㎡の超高密度。子どもや犬が走る庭の基準になる一枚',
    pile: '35mm',
    features: ['超高密度', '静電抑制', '防炎', '防カビ', '高耐久', 'FIFA認定工場製'],
    suitableFor: [
      '子どもが裸足で遊ぶ庭',
      '犬が毎日走るドッグラン',
      '見た目のボリューム感を大切にしたい戸建ての庭',
      'マンション専用庭・屋上など長く使いたい場所',
    ],
    notes: ['ベランダなど小さなスペースで費用を抑えたい場合は、同じ密度で芝丈の短いLiteも選択肢になります'],
    body: [
      'グリーンプランニングの主力商品で、1㎡あたり134万本という密度が特長です。芝糸が密に立っているため踏んでも倒れにくく、素足やパッドで触れたときの感触が柔らかく、天然芝に近い見え方になります。',
      '弾力のあるC型パイルと、クッション性を生む縮れたクリンプパイルを組み合わせた構造で、芝が寝にくく、ボリュームが長持ちします。防炎認定・静電気抑制加工・防カビ加工が施されているので、住宅の庭からマンションのベランダ、施設まで使えます。',
      '静岡EASTでは、子どもやペットが日常的に使う庭、天然芝から張り替える庭に、まずこの商品をご提案しています。田方郡の施工事例では、天然芝の庭をアメイジングターフ35mmと充填材ジオフィルで仕上げました。',
    ],
    spec: [
      { label: '芝丈', value: '35mm（±2mm）' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）＋PP（ポリプロピレン）複合' },
      { label: '基布素材', value: 'PP（ポリプロピレン）、PU（ポリウレタン）' },
      { label: '規格サイズ', value: '1m×10m、2m×10m' },
      { label: '密度', value: '134万本/㎡' },
      { label: '認定・加工', value: '防炎認定取得／静電気抑制加工／防カビ加工' },
      { label: '主な適用箇所', value: '庭・ベランダ・マンション専用庭・屋上・ペットスペース・エントランス・法人施設' },
    ],
    prices: [{ variant: '35mm', price: '¥5,500/㎡', priceTaxIn: '税込 ¥6,050/㎡' }],
    photo: 'productAmazingTurf',
    hqUrl: 'https://greenplanning.jp/lineup/amazingturf/',
    relatedServices: ['garden', 'dogrun', 'kids', 'natural-grass'],
    description:
      'アメイジングターフ35mmは134万本/㎡の超高密度人工芝。防炎・静電抑制・防カビ。子どもや愛犬が遊ぶ庭、天然芝からの張り替えに静岡EASTがまずご提案する一枚。仕様・価格・向いている人を解説。',
  },
  {
    slug: 'amazing-turf-lite',
    name: 'アメイジングターフ Lite',
    nameEn: 'Amazing Turf Lite',
    series: 'Amazing Turf',
    catch: '密度はそのまま、芝丈25mm。ベランダや小さなスペースに',
    pile: '25mm',
    features: ['超高密度', '静電抑制', '防カビ', '高耐久', 'FIFA認定工場製'],
    suitableFor: [
      'マンションのベランダ・バルコニー',
      '玄関まわりや通路など小さなスペース',
      '質感は落とさず、費用のバランスを取りたいご家庭',
      'すっきり短めの仕上がりが好みの方',
    ],
    notes: ['35mm版と違い、防炎認定の記載はありません。防炎性能が求められる場所では35mm版かアイランドグラスをご検討ください'],
    body: [
      'アメイジングターフの高密度設計をそのままに、芝丈を25mmにした商品です。芝が短いぶん見た目がすっきりし、ベランダや玄関まわりのような小さなスペースでも重たく見えません。',
      'C型パイルとクリンプパイルの複合構造は35mm版と同じで、踏んだあとの起き上がりやクッション性は変わりません。基布にはSBR（合成ゴム）を採用しています。',
      '35mm版より材料費を抑えられるので、「本格的な人工芝を、まずベランダから」というご家庭に向いています。',
    ],
    spec: [
      { label: '芝丈', value: '25mm（±2mm）' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）＋PP（ポリプロピレン）複合' },
      { label: '基布素材', value: 'SBR（スチレンブタジエン合成ゴム）' },
      { label: '規格サイズ', value: '1m×10m、2m×10m' },
      { label: '密度', value: '134万本/㎡' },
      { label: '認定・加工', value: '静電気抑制加工／防カビ加工' },
      { label: '主な適用箇所', value: 'ベランダ・バルコニー・エントランス・屋上・ペットスペース・庭・マンション専用庭' },
    ],
    prices: [{ variant: '25mm', price: '¥4,500/㎡', priceTaxIn: '税込 ¥4,950/㎡' }],
    photo: 'productAmazingTurfLite',
    hqUrl: 'https://greenplanning.jp/lineup/amazingturf_lite/',
    relatedServices: ['balcony', 'mansion', 'parking'],
    description:
      'アメイジングターフLite 25mmは、134万本/㎡の密度はそのままに芝丈を短くした人工芝。ベランダ・玄関まわり・小さなスペースに。仕様・価格・向いている人を静岡EASTが解説。',
  },
  {
    slug: 'island-grass-type-r',
    name: 'アイランドグラス タイプR',
    nameEn: 'Island Grass Type R',
    series: 'Island Grass',
    catch: 'やわらかな肌触りの国産人工芝。裸足で過ごす庭に',
    pile: '35mm / 25mm',
    features: ['静電抑制', '防炎', '日本製'],
    suitableFor: [
      '裸足で過ごすことが多い庭',
      '小さな子どもが転ぶことを考えたい遊び場',
      'マンション専用庭（防炎認定あり）',
      '国産にこだわりたい方',
    ],
    body: [
      '素材選びから製造まで国内で管理された、グリーンプランニングの国産オリジナル人工芝です。芝糸の断面を薄く扁平にすることで、触れたときの柔らかさと適度な沈み込みを両立しています。',
      '防炎認定と静電気抑制加工を標準で備え、子どもや犬が長い時間過ごす場所に向いています。35mmと25mmの2種類の芝丈があり、庭には35mm、ベランダや通路には25mmというように使い分けられます。',
      'アメイジングターフより材料費を抑えられるため、広い庭を全面施工したいときの選択肢にもなります。',
    ],
    spec: [
      { label: '芝丈', value: '35mm（±2mm）／25mm（±2mm）' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）＋PP（ポリプロピレン）複合' },
      { label: '基布素材', value: 'PP（ポリプロピレン）' },
      { label: '規格サイズ', value: '1m×10m' },
      { label: '認定・加工', value: '防炎認定取得／静電気抑制加工' },
      { label: '主な適用箇所', value: '庭・ベランダ・マンション専用庭・屋上・ペットスペース・エントランス・子どもの遊び場' },
    ],
    prices: [
      { variant: '35mm', price: '¥3,900/㎡', priceTaxIn: '税込 ¥4,290/㎡' },
      { variant: '25mm', price: '¥3,300/㎡', priceTaxIn: '税込 ¥3,630/㎡' },
    ],
    photo: 'productIslandGrassR',
    hqUrl: 'https://greenplanning.jp/lineup/islandgrass-typer/',
    relatedServices: ['kids', 'garden', 'mansion'],
    description:
      'アイランドグラス タイプRは、扁平な芝糸で肌触りの柔らかい国産人工芝。防炎認定・静電抑制。裸足で過ごす庭や子どもの遊び場、マンション専用庭に。仕様・価格・向いている人を解説。',
  },
  {
    slug: 'island-grass-type-c',
    name: 'アイランドグラス タイプC',
    nameEn: 'Island Grass Type C',
    series: 'Island Grass',
    catch: '踏まれても起き上がる。出入りの多い場所の国産人工芝',
    pile: '35mm / 25mm',
    features: ['静電抑制', '防炎', '日本製'],
    suitableFor: [
      '玄関アプローチや通路など、毎日同じ場所を歩くところ',
      '屋上・エントランス・店舗前など人の出入りが多い場所',
      '駐車場まわりの緑のライン',
      '芝が寝てしまうのが気になる方',
    ],
    body: [
      '芝糸の断面をC型に成形し、踏まれたあとに芝が立ち上がる「起立性」と「復元性」を高めた国産オリジナル人工芝です。人が繰り返し通る場所でも、芝が寝てぺたんとした見た目になりにくいのが特長です。',
      '柔らかなPE＋PP複合パイルで、素足で触れてもチクチクしません。防炎認定・静電気抑制加工を標準装備しています。',
      '静岡EASTでは、玄関アプローチ、通路、駐車場まわりのように「歩く回数が多い場所」にこの商品をご提案することが多くあります。',
    ],
    spec: [
      { label: '芝丈', value: '35mm（±2mm）／25mm（±2mm）' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）＋PP（ポリプロピレン）複合' },
      { label: '基布素材', value: 'PP（ポリプロピレン）' },
      { label: '規格サイズ', value: '1m×10m' },
      { label: '認定・加工', value: '防炎認定取得／静電気抑制加工' },
      { label: '主な適用箇所', value: '庭・ベランダ・マンション専用庭・屋上・エントランス・駐車場・通路・法人施設' },
    ],
    prices: [
      { variant: '35mm', price: '¥3,900/㎡', priceTaxIn: '税込 ¥4,290/㎡' },
      { variant: '25mm', price: '¥3,300/㎡', priceTaxIn: '税込 ¥3,630/㎡' },
    ],
    photo: 'productIslandGrassC',
    hqUrl: 'https://greenplanning.jp/lineup/islandgrass-typec/',
    relatedServices: ['parking', 'facility', 'balcony'],
    description:
      'アイランドグラス タイプCは、C型断面で踏まれても起き上がる国産人工芝。玄関アプローチ・通路・駐車場・施設など出入りの多い場所に。仕様・価格・向いている人を静岡EASTが解説。',
  },
  {
    slug: 'island-grass-type-g',
    name: 'アイランドグラス タイプG',
    nameEn: 'Island Grass Type G',
    series: 'Island Grass',
    catch: '芝丈10mmのショートタイプ。景観のアクセントとパター練習に',
    pile: '10mm',
    features: ['静電抑制', '防炎', '日本製', 'グリーン／ミックスの2色'],
    suitableFor: [
      '庭の一角に手軽なパター練習スペースをつくりたい方',
      '駐車場のラインや通路など、短い芝ですっきり見せたい場所',
      '施設の景観づくり',
      'ゴルフグリーン用ターフより費用を抑えて練習面をつくりたい方',
    ],
    notes: ['本格的なパッティングの転がりを求める場合は、ゴルフ専用のゴルフグリーン用ターフ（13mm）をご検討ください'],
    body: [
      '縮れたクリンプパイル糸を高密度に打ち込んだ、耐久性に特化した国産人工芝です。芝丈10mmのショートタイプで、鮮やかなグリーン単色と、自然な色合いのミックスの2色から選べます。',
      '繰り返しの使用にも強く、へたりにくい設計なので、庭の景観アクセントから、ゴルフのパター練習まで幅広く使えます。',
      '静岡EASTでは、庭全体はアメイジングターフやタイプRにして、一角だけタイプGでパター練習スペースをつくる、という組み合わせもご提案しています。',
    ],
    spec: [
      { label: '芝丈', value: '10mm（±2mm）' },
      { label: 'カラー', value: 'グリーン／ミックスの2色' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）' },
      { label: '基布素材', value: 'PP（ポリプロピレン）' },
      { label: '規格サイズ', value: '1m×10m' },
      { label: '認定・加工', value: '防炎認定取得／静電気抑制加工' },
      { label: '主な適用箇所', value: '庭の景観アクセント・ゴルフパター練習・エントランス・通路・駐車場・施設' },
    ],
    prices: [
      { variant: 'グリーン 10mm', price: '¥3,300/㎡', priceTaxIn: '税込 ¥3,630/㎡' },
      { variant: 'ミックス 10mm', price: '¥3,300/㎡', priceTaxIn: '税込 ¥3,630/㎡' },
    ],
    photo: 'productIslandGrassG',
    hqUrl: 'https://greenplanning.jp/lineup/islandgrass-typeg/',
    relatedServices: ['golf', 'parking', 'facility'],
    description:
      'アイランドグラス タイプGは芝丈10mm・クリンプパイル高密度の国産人工芝。庭の景観アクセント、駐車場、パター練習スペースに。仕様・価格・向いている人を静岡EASTが解説。',
  },
  {
    slug: 'golf-green',
    name: 'ゴルフグリーン用ターフ',
    nameEn: 'Golf Green',
    series: 'Golf Green',
    catch: '自宅の庭やテラスを、毎日使えるパター練習グリーンに',
    pile: '13mm',
    features: ['防炎', 'FIFA認定工場製', '高密度13mmパイル'],
    suitableFor: [
      '自宅の庭・テラス・ベランダで本格的なパッティング練習をしたい方',
      '室内の練習スペース',
      'ゴルフ練習場・シミュレーター・店舗・イベント会場',
    ],
    body: [
      'ゴルフ練習のためにつくられた高密度13mmの人工芝です。芝丈が短く密度が高いため、ボールの転がりが安定し、パッティングの練習に向いています。',
      'PEパイルにPP基布とラテックスコーティングを組み合わせ、芝糸の固定力と耐久性を高めています。屋外の庭やテラスだけでなく、室内の練習スペースにも使えます。',
      '静岡EASTでは、庭全体を通常の人工芝にして、その一角にゴルフグリーン用ターフでパターグリーンをつくる提案をしています。カップの位置やグリーンの形もご相談ください。',
    ],
    spec: [
      { label: '芝丈', value: '13mm（±2mm）' },
      { label: 'パイル素材', value: 'PE（ポリエチレン）' },
      { label: '基布素材', value: 'PP（ポリプロピレン）＋Latex（ラテックス）' },
      { label: '規格サイズ', value: '2m×10m' },
      { label: '認定・加工', value: '防炎認定取得' },
      { label: '主な適用箇所', value: '庭・テラス・ゴルフ練習場・ゴルフシミュレーター・室内・施設・イベント会場' },
    ],
    prices: [{ variant: '13mm', price: '¥8,800/㎡', priceTaxIn: '税込 ¥9,680/㎡' }],
    photo: 'productGolfGreen',
    hqUrl: 'https://greenplanning.jp/lineup/golfgreen/',
    relatedServices: ['golf', 'garden', 'balcony'],
    description:
      'ゴルフグリーン用ターフ13mmは、ボールの転がりが安定する高密度のゴルフ練習用人工芝。自宅の庭・テラス・室内のパター練習に。仕様・価格・グリーンのつくり方を静岡EASTが解説。',
  },
  {
    slug: 'geofill',
    name: '人工芝充填材ジオフィル',
    nameEn: 'GeoFill',
    series: 'GeoFill',
    catch: '天然ヤシ100%の充填材。夏の熱さ、臭い、クッション性の答え',
    pile: '—',
    features: ['温度抑制', '静電抑制', '衝撃吸収', '排水性', '消臭', '日本製', '天然素材100%'],
    suitableFor: [
      '犬のおしっこの臭いが気になるドッグラン',
      '夏の表面温度を抑えたい庭',
      '転倒時の衝撃を和らげたい子どもの遊び場',
      'スポーツグラウンド・フットサルコートなどの施設',
    ],
    body: [
      '天然ヤシの植物繊維を原料にした人工芝用の充填材です。人工芝の芝糸の根元に入れることで、芝を立たせて踏み心地を良くし、衝撃を吸収します。化学物質を使っていないため、子どもや犬が直接触れる場所でも使えます。',
      '本部の実験データでは、芝表面の温度を他の素材と比べて約20℃低く保つことが確認されています。通気性・排水性に優れ、臭いを抑える働きもあるため、ドッグランとの相性が良い素材です。',
      'FIFAや日本サッカー協会、ワールドラグビーなどの認定を受け、国内外のスポーツフィールドで採用されています。グリーンプランニングはジオフィルの正規販売店で、静岡EASTの田方郡の施工事例でもアメイジングターフと組み合わせて使いました。',
    ],
    spec: [
      { label: '成分', value: '天然ヤシ100%' },
      { label: '質量', value: '20kg/袋、500kg/袋、1t/袋' },
      { label: '主な適用箇所', value: '庭・ペットスペース・スポーツグラウンド・フットサルコート・ゴルフ場・法人施設' },
    ],
    photo: 'productGeofill',
    hqUrl: 'https://greenplanning.jp/lineup/geofill/',
    relatedServices: ['dogrun', 'kids', 'heat', 'facility'],
    description:
      '人工芝充填材ジオフィルは天然ヤシ100%。表面温度の抑制、衝撃吸収、排水、消臭に働き、ドッグランや子どもの遊び場、夏の熱さ対策に。静岡EASTの施工事例と合わせて解説。',
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
