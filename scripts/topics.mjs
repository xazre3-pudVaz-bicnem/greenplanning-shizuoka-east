/**
 * ブログ（人工芝コラム）のトピック一覧。
 *
 * 1記事 = 1クエリ で設計しています（intent が記事同士でぶつからないように）。
 * 「静岡 人工芝」だけを毎日書くのではなく、検索意図を散らすのが目的です。
 * 用途ページ・ガイドページ（/dogrun, /price など）と同じクエリを狙わないように、
 * コラムは「ひとつ細かい疑問」「地域の具体的な話」「比較の一部分」に寄せています。
 *
 * category … src/lib/blog.ts の blogCategories のキー
 * intent   … その記事が狙う検索。重複すると同じ記事を二度書くことになる
 * angle    … 何をどう書くか。具体的に書くほど記事がばらけます
 */

export const topics = [
  /* ───────── 人工芝の基礎知識 ───────── */
  { category: 'basics', title: '新築の庭は砂利・天然芝・人工芝のどれがいい？', intent: '新築 庭 砂利 天然芝 人工芝 どれ', angle: '新築の土のままの庭で3つを比べる。手入れ・見た目・費用感・子どもや犬との相性。どれかを否定せず、向く家庭を分ける。' },
  { category: 'basics', title: '人工芝の芝丈は何mmを選べばいい？', intent: '人工芝 芝丈 何mm', angle: '35mm・25mm・13mm・10mmの見え方と使い勝手の違い。庭・ベランダ・通路・ゴルフで分ける。' },
  { category: 'basics', title: '人工芝の「密度」とは何か。134万本/㎡の意味', intent: '人工芝 密度 とは', angle: '1㎡あたりの芝糸の本数が、踏み心地・芝の寝やすさ・下地の透けにどう効くか。アメイジングターフの数字を例に。' },
  { category: 'basics', title: '人工芝の防炎認定は何のためにある？', intent: '人工芝 防炎 認定 意味', angle: '集合住宅のベランダや施設で防炎性能が求められる背景。どの商品が取得しているか。' },
  { category: 'basics', title: '国産の人工芝と海外製の人工芝、何が違う？', intent: '人工芝 国産 海外製 違い', angle: 'アイランドグラス（国産）とアメイジングターフ（FIFA認定工場製）を例に、製造管理・密度・費用のどれを優先するか。' },
  { category: 'basics', title: '人工芝の静電気対策。冬のパチパチを減らすには', intent: '人工芝 静電気 対策', angle: '乾燥した季節に起きる静電気と、静電気抑制加工の意味。犬や子どもがいる庭での配慮。' },
  { category: 'basics', title: '人工芝の水抜き穴の仕組み', intent: '人工芝 水抜き穴', angle: '基布の穴から水が抜ける構造と、下地・防草シートとの関係。穴があっても水がたまる理由。' },
  { category: 'basics', title: '人工芝のサンプルで確認したい5つのこと', intent: '人工芝 サンプル 確認', angle: '色・手触り・芝糸の断面・裏面・厚み。庭の光で見る大切さ。' },

  /* ───────── 静岡の人工芝 ───────── */
  { category: 'shizuoka', title: '静岡の気候と人工芝。温暖で雨が多い地域で気をつけること', intent: '静岡 気候 人工芝', angle: '温暖・多雨・雑草の生育期間が長い・沿岸の潮風・高原の霜。それぞれが下地と商品選びにどう影響するか。' },
  { category: 'shizuoka', title: '静岡の海沿いの庭に人工芝を敷くとき', intent: '海沿い 庭 人工芝', angle: '砂まじりの土・潮風・砂の入り込み。端部の固定と掃除の話。' },
  { category: 'shizuoka', title: '富士山麓の火山灰土と人工芝の下地', intent: '火山灰 土 人工芝 下地', angle: '軽くて崩れやすい土での転圧と不陸調整。富士市・富士宮市・御殿場市の庭。' },
  { category: 'shizuoka', title: '静岡で人工芝の施工に向いている季節はいつ？', intent: '人工芝 施工 時期 季節', angle: '雨・暑さ・雑草の伸びで考える施工時期。断定せず、それぞれの季節の利点と注意点。' },
  { category: 'shizuoka', title: '伊豆の別荘の庭を、来たときにすぐ使える庭にする', intent: '別荘 庭 雑草 人工芝', angle: '月に一度しか来ない庭の雑草問題と、防草シート＋人工芝。傾斜地の考え方。' },

  /* ───────── 庭・雑草対策 ───────── */
  { category: 'weed', title: '人工芝の下に防草シートは必要？', intent: '人工芝 防草シート 必要', angle: 'なぜ必要か、省くとどうなるか、重ね幅と端部。DIYで省いて後悔する例を一般論で。' },
  { category: 'weed', title: '人工芝にすると雑草は本当に生えない？', intent: '人工芝 雑草 生えない 本当', angle: '「大幅に減るが、継ぎ目・端からまれに出る」を正直に。出たときの対処。' },
  { category: 'weed', title: '砂利の庭に雑草が生える理由と、やり直しの方法', intent: '砂利 庭 雑草 生える', angle: '砂利の隙間に土がたまる仕組み。砂利を撤去するか、上に下地をつくるか。' },
  { category: 'weed', title: '除草剤と人工芝、庭の雑草対策として何が違う？', intent: '除草剤 人工芝 違い', angle: '効く対象・繰り返しの手間・費用の考え方を公平に。除草剤直後の施工は可能。' },
  { category: 'weed', title: '草むしりをやめたい。腰と膝にやさしい庭の作り方', intent: '草むしり やめたい', angle: '高齢のご家庭や体の負担を考えた庭。防草シート＋人工芝と、一部だけ施工する考え方。' },
  { category: 'weed', title: '空き家・実家の庭の雑草をどうするか', intent: '実家 庭 雑草 対策', angle: '頻繁に行けない庭の雑草管理。人工芝・防草シート・砂利のそれぞれの向き不向き。' },
  { category: 'weed', title: 'ウッドデッキの下から生える雑草を止める', intent: 'ウッドデッキ 下 雑草', angle: 'デッキ下の防草シート敷き込みと、デッキ脇の人工芝の納まり。' },

  /* ───────── 犬・ドッグラン ───────── */
  { category: 'dog', title: '犬のドッグランに人工芝がおすすめな理由', intent: '犬 ドッグラン 人工芝 おすすめ 理由', angle: '土・天然芝・砂利との比較。泥・掘り返し・肉球・排水。' },
  { category: 'dog', title: '人工芝で犬のおしっこの臭いはどうする？', intent: '人工芝 犬 おしっこ 臭い', angle: '水で流す・排水を確保する・ジオフィルの通気と消臭。こもる原因は下地。' },
  { category: 'dog', title: '犬が人工芝を掘る・噛む。施工でできる備え', intent: '犬 人工芝 掘る 噛む', angle: '基布の構造・端部の固定・継ぎ目。狙われるのは端。' },
  { category: 'dog', title: 'シニア犬の足腰と庭の床材', intent: 'シニア犬 庭 床 クッション', angle: '硬い地面を避けたい理由と、密度・充填材でクッション性を上げる方法。断定は避ける。' },
  { category: 'dog', title: '多頭飼いの庭を人工芝にするときの考え方', intent: '多頭飼い 庭 人工芝', angle: '走る負荷の集中、フェンス、足洗い場、排水。' },
  { category: 'dog', title: '雨の日の散歩の代わりになる庭', intent: '雨の日 犬 散歩 庭', angle: '泥にならない庭で犬を出せる価値。人工芝の水はけと下地。' },
  { category: 'dog', title: '犬の抜け毛と人工芝の掃除', intent: '人工芝 犬 抜け毛 掃除', angle: 'デッキブラシ・水流し・ブロワー。掃除機の向き不向き。' },

  /* ───────── ゴルフ ───────── */
  { category: 'golf', title: '庭に自宅パターグリーンを作る方法', intent: '庭 パターグリーン 作り方', angle: '広さの目安、下地の平らさ、ゴルフグリーン用ターフ13mm、カップ。庭全体との組み合わせ。' },
  { category: 'golf', title: 'ベランダにパター練習スペースを作れる？', intent: 'ベランダ パター練習 人工芝', angle: 'コンクリートの上に敷く利点、幅と長さ、排水口、防炎。' },
  { category: 'golf', title: 'ゴルフ用人工芝と庭用人工芝の違い', intent: 'ゴルフ 人工芝 庭用 違い', angle: '芝丈・密度・転がり・価格。ゴルフグリーン用ターフとタイプGの位置づけ。' },
  { category: 'golf', title: 'パターグリーンの転がりを決める「下地の平らさ」', intent: 'パターグリーン 下地 平ら', angle: '不陸調整と転圧、軽い勾配。DIYで難しい理由。' },

  /* ───────── 子ども・家族 ───────── */
  { category: 'family', title: '子どもが庭で遊びやすい外構づくり', intent: '子ども 庭 遊びやすい 外構', angle: '人工芝・フェンス・立水栓・日陰。転倒への配慮。安全の断定はしない。' },
  { category: 'family', title: '庭のビニールプールと人工芝', intent: '庭 プール 人工芝', angle: '底が汚れない・水が抜ける・夏の散水。' },
  { category: 'family', title: '人工芝の庭で裸足で遊ぶということ', intent: '人工芝 裸足 遊ぶ', angle: '柔らかさ（タイプR）と静電気抑制、夏の熱さ対策。' },
  { category: 'family', title: '共働き家庭の「手入れをしない庭」の作り方', intent: '共働き 庭 手入れ しない', angle: '週末しか庭に出ない前提で、雑草・泥・芝刈りをなくす設計。' },
  { category: 'family', title: '転んだときのことを考えた庭の床', intent: '子ども 転ぶ 庭 床 衝撃', angle: '土・砂利・コンクリート・人工芝の比較。ジオフィルの衝撃吸収。絶対安全とは言わない。' },

  /* ───────── 施工・下地 ───────── */
  { category: 'construction', title: '人工芝の「不陸調整」とは？平らにする理由', intent: '人工芝 不陸調整 とは', angle: '凹凸が水たまりと波打ちにつながる仕組み。' },
  { category: 'construction', title: '人工芝の下地の転圧はなぜ必要か', intent: '人工芝 下地 転圧', angle: '足で踏むだけとの差。数年後の沈み。' },
  { category: 'construction', title: '人工芝の継ぎ目が目立つ原因と対処', intent: '人工芝 継ぎ目 目立つ', angle: '芝目の向き・段差・接合。施工時の処理。' },
  { category: 'construction', title: '人工芝の端がめくれる原因', intent: '人工芝 端 めくれる', angle: 'ピンの間隔・端部処理・風・犬。' },
  { category: 'construction', title: 'コンクリートの上に人工芝を敷くときの注意点', intent: 'コンクリート 人工芝 敷く 注意', angle: '排水口・勾配・固定方法・防炎。' },
  { category: 'construction', title: '天然芝を剥がさずに人工芝を敷いてはいけない理由', intent: '天然芝 上 人工芝 敷く', angle: '根が残ると腐って沈む・芽が出る。撤去の工程。' },
  { category: 'construction', title: '人工芝の水はけが悪くなる原因', intent: '人工芝 水はけ 悪くなる 原因', angle: '下地の沈み・勾配なし・粘土質・排水の逃げ道なし。' },
  { category: 'construction', title: 'マンション専用庭の人工芝、搬入と管理規約で確認すること', intent: 'マンション 専用庭 人工芝 管理規約', angle: '届出・防炎・搬入経路。断定は避け、確認を促す。' },

  /* ───────── 費用 ───────── */
  { category: 'price', title: '人工芝の見積りで確認したい内訳', intent: '人工芝 見積り 内訳', angle: '材料・撤去・下地・副資材・施工・保証。安い見積りの落とし穴。' },
  { category: 'price', title: '人工芝の費用を抑える3つの方法', intent: '人工芝 費用 抑える', angle: '範囲を絞る・商品を選ぶ・芝丈を選ぶ。参考価格の範囲で。' },
  { category: 'price', title: '天然芝の維持費と人工芝の費用を数年で比べる', intent: '天然芝 維持費 人工芝 比較', angle: '芝刈り機・水道・肥料・時間。具体的な金額の断定はせず、考え方を示す。' },
  { category: 'price', title: '面積が広いと人工芝の㎡単価はどうなる？', intent: '人工芝 広い 単価', angle: 'ロス・搬入・工程の効率。' },

  /* ───────── メンテナンス ───────── */
  { category: 'maintenance', title: '人工芝は何年使える？長持ちする使い方', intent: '人工芝 何年 使える', angle: '約7〜10年の目安と、摩擦・下地・紫外線。' },
  { category: 'maintenance', title: '人工芝は夏に熱くなる？散水と日陰と充填材', intent: '人工芝 夏 熱くなる', angle: '事実と対策。ジオフィルの温度抑制。' },
  { category: 'maintenance', title: '人工芝の落ち葉・砂の掃除方法', intent: '人工芝 落ち葉 掃除', angle: 'ほうき・ブロワー・水流し。' },
  { category: 'maintenance', title: '人工芝が寝てしまったときの起こし方', intent: '人工芝 寝る 起こす', angle: 'デッキブラシで芝目に逆らう。重量物の跡。' },
  { category: 'maintenance', title: '人工芝にカビは生える？日陰の庭の注意', intent: '人工芝 カビ', angle: '水はけと防カビ加工。日陰で湿る場所の改善。' },
  { category: 'maintenance', title: '雪が積もったあとの人工芝', intent: '人工芝 雪 積もる', angle: '溶けるのを待つ・削らない・ブラッシング。御殿場・富士宮。' },
  { category: 'maintenance', title: '人工芝でやってはいけないこと', intent: '人工芝 やってはいけない', angle: '熱湯・有機溶剤・火気・重量物・金属の熊手。' },

  /* ───────── DIY比較 ───────── */
  { category: 'diy', title: '人工芝をDIYするときによくある失敗', intent: '人工芝 DIY 失敗', angle: '根の除去・転圧・継ぎ目・端部・防草シートの重ね。' },
  { category: 'diy', title: 'ベランダの人工芝はDIYでできる？', intent: 'ベランダ 人工芝 DIY', angle: '向いている条件・排水口・固定方法・防炎。' },
  { category: 'diy', title: '人工芝のDIYに必要な道具と副資材', intent: '人工芝 DIY 道具', angle: 'カッター・ピン・防草シート・テープ・転圧。副資材のみの販売にも触れる。' },
  { category: 'diy', title: 'DIYで敷いた人工芝を業者にやり直してもらえる？', intent: '人工芝 DIY やり直し 業者', angle: '状態確認・部分やり直し・下地から。' },

  /* ───────── エリア情報 ───────── */
  { category: 'area', title: '沼津市で人工芝を検討するときのポイント', intent: '沼津市 人工芝 ポイント', angle: '海沿いの砂地・狩野川低地・新しい分譲地。店舗が沼津にあること。' },
  { category: 'area', title: '三島市で雑草の少ない庭を作る方法', intent: '三島市 庭 雑草 少ない', angle: '湧水と地下水位・水はけ・防草シート。' },
  { category: 'area', title: '富士市・富士宮市の庭と人工芝。雨と火山灰土', intent: '富士市 富士宮市 庭 人工芝', angle: '多雨・火山灰土・広い庭の一部施工。' },
  { category: 'area', title: '御殿場市の雪と霜に強い庭', intent: '御殿場 庭 雪 人工芝', angle: '高原の冬・雪解け後のブラッシング・ドッグラン。' },
  { category: 'area', title: '静岡市のマンション専用庭にも人工芝は施工できる？', intent: '静岡市 マンション 専用庭 人工芝', angle: '管理規約・防炎・搬入。温暖で雑草が長い。' },
  { category: 'area', title: '藤枝市・焼津市の新築の庭、土のまま放置しないために', intent: '藤枝 焼津 新築 庭 土', angle: 'ベッドタウンの子育て世帯、共働き、潮風。' },
  { category: 'area', title: '伊豆の傾斜地の庭に人工芝を敷くとき', intent: '伊豆 傾斜地 庭 人工芝', angle: '平らな部分を使う・段差・別荘。田方郡の事例に触れる。' },
];

/**
 * カテゴリごとの内部リンク先。
 * どの記事からも必ずサービス・事例・商品のページへ入れるようにしています。
 * src/lib/blog-links.ts と同じ内容にしておくこと。
 */
export const categoryLinks = {
  basics: ['/how-to-choose', '/products', '/artificial-grass'],
  shizuoka: ['/area', '/artificial-grass', '/works'],
  weed: ['/weed-control', '/garden', '/price'],
  dog: ['/dogrun', '/products/geofill', '/works'],
  golf: ['/golf', '/products/golf-green', '/estimate'],
  family: ['/kids', '/garden', '/products/island-grass-type-r'],
  construction: ['/artificial-grass', '/drainage', '/flow'],
  price: ['/price', '/estimate', '/works'],
  maintenance: ['/maintenance', '/lifespan', '/faq'],
  diy: ['/diy-vs-pro', '/products', '/price'],
  area: ['/area', '/works', '/estimate'],
};

/** eyecatch に指定できる写真キー（src/data/photos.ts と一致させること。代表の写真は使わない） */
export const photoKeys = [
  'workTagataBefore',
  'workTagataAfter',
  'workTagataApproach',
  'eastWorkInProgress',
  'eastWorkAfter',
  'gardenHouse',
  'mansionGarden',
  'balconyTerrace',
  'dogrunPoodles',
  'golfPuttingGreen',
  'parkingStripes',
  'entranceApproach',
  'turfHandTouch',
  'baHouseAfter',
  'baMansionBefore',
  'baMansionAfter',
  'baRooftopAfter',
  'baWeedsBefore',
  'baWeedsAfter',
  'productAmazingTurf',
  'productIslandGrassR',
  'productIslandGrassC',
  'productIslandGrassG',
  'productGolfGreen',
  'productGeofill',
];

/** カテゴリごとに、まず選びたい写真（迷ったときの既定値） */
export const categoryPhotos = {
  basics: ['turfHandTouch', 'productAmazingTurf', 'productIslandGrassR', 'gardenHouse'],
  shizuoka: ['workTagataAfter', 'gardenHouse', 'eastWorkAfter', 'workTagataApproach'],
  weed: ['baMansionBefore', 'baWeedsBefore', 'baMansionAfter', 'baWeedsAfter'],
  dog: ['dogrunPoodles', 'productGeofill', 'workTagataAfter'],
  golf: ['golfPuttingGreen', 'productGolfGreen', 'productIslandGrassG'],
  family: ['baHouseAfter', 'productIslandGrassR', 'gardenHouse'],
  construction: ['eastWorkInProgress', 'workTagataBefore', 'eastWorkAfter'],
  price: ['baHouseAfter', 'mansionGarden', 'baRooftopAfter'],
  maintenance: ['eastWorkAfter', 'gardenHouse', 'turfHandTouch'],
  diy: ['eastWorkInProgress', 'balconyTerrace', 'productIslandGrassC'],
  area: ['workTagataAfter', 'gardenHouse', 'mansionGarden', 'workTagataApproach'],
};

/** 内部リンクとして許可するパス（用途・ガイド・商品・エリア・固定ページ） */
export const validPaths = [
  '/',
  '/artificial-grass',
  '/garden',
  '/dogrun',
  '/golf',
  '/weed-control',
  '/kids',
  '/mansion',
  '/balcony',
  '/parking',
  '/facility',
  '/exterior',
  '/price',
  '/how-to-choose',
  '/diy-vs-pro',
  '/natural-grass',
  '/maintenance',
  '/lifespan',
  '/drainage',
  '/heat',
  '/products',
  '/products/amazing-turf',
  '/products/amazing-turf-lite',
  '/products/island-grass-type-r',
  '/products/island-grass-type-c',
  '/products/island-grass-type-g',
  '/products/golf-green',
  '/products/geofill',
  '/works',
  '/works/tagata-natural-to-amazing',
  '/area',
  '/area/numazu',
  '/area/mishima',
  '/area/fuji',
  '/area/fujinomiya',
  '/area/gotemba',
  '/area/shizuoka',
  '/area/fujieda',
  '/area/yaizu',
  '/area/izu',
  '/about',
  '/flow',
  '/faq',
  '/contact',
  '/estimate',
  '/blog',
];
