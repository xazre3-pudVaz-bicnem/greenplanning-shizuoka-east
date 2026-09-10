# 人工芝専門店グリーンプランニング静岡EAST 公式サイト

静岡県沼津市を拠点に、静岡県東部・中部・伊豆地域で人工芝施工を行う「人工芝専門店グリーンプランニング静岡EAST」の独立した公式サイトです。

Next.js 16（App Router）+ TypeScript + Tailwind CSS v4。写真主体・白ベースの設計で、「静岡 人工芝」のローカルSEOと、ドッグラン・ゴルフ・雑草対策・費用などの用途・悩み・比較系の検索から、写真見積りにつなげることを目的にしています。

> **本部サイトとの関係**
> 本部（greenplanning.jp）は「正確な会社情報・商品情報・施工情報を確認する一次情報」として使い、文章はすべて静岡EAST向けに独自に書いています。本部サイトの文章はコピーしていません（`scratchpad` の重複チェックで確認済み）。

---

## セットアップ

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL を本番ドメインに書き換える
npm run dev
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド |
| `npm run start` | ビルド後のサーバー |
| `npm run lint` | ESLint |
| `npm run typecheck` | 型チェック |
| `npm run fonts:fetch` | 見出し用フォントを `public/fonts` へ取得（初回のみ・取得済み） |
| `npm run images:prepare` | `assets/originals` の元写真を最適化して `public/photos` へ |
| `npm run brand:make` | `public/logo.jpg` からロゴ（透過PNG）・ファビコン・アプリアイコン・OG画像を生成 |
| `npm run blog:generate` | コラム記事を1本生成（通常はGitHub Actionsから） |

---

## 環境変数

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番URL（オリジンのみ）。**未設定のあいだは canonical / OG / sitemap を出さず、robots.txt を Disallow にします。** プレビューURLが検索結果に出る事故を構造的に防ぐためです。本番公開時に必ず設定してください。 |
| `NEXT_PUBLIC_ALLOW_INDEXING` | **検索エンジンへの公開スイッチ。既定は非公開（noindex）。** `true` にしたときだけインデックスを許可します。詳しくは下の「検索エンジンへの公開」を参照。 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 の測定ID。設定すると gtag を出力します。 |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console の HTMLタグ認証の content 値。設定すると `<meta name="google-site-verification">` を出力します。 |
| `RESEND_API_KEY` | お問い合わせ・写真見積りフォームのメール送信（Resend）。未設定のとき、フォームは電話・メールの案内に切り替わります。 |
| `MAIL_FROM` | 送信元アドレス（Resend で認証済みドメイン）。 |
| `MAIL_TO` | 受信先。省略時は `shizuoka-east@greenplanning.jp`。 |
| `ANTHROPIC_API_KEY` | コラム自動生成用（GitHub Secrets） |
| `CLAUDE_MODEL` | 使用モデル。未設定なら `claude-haiku-4-5`（GitHub の Variables で差し替え可能） |

---

## 制作したページ一覧とターゲットキーワード

### トップ・会社

| パス | 内容 | ターゲットキーワード |
| --- | --- | --- |
| `/` | トップ（HERO / 静岡EASTについて / Before-After / お悩み / できること / 犬 / ゴルフ / 雑草 / 施工品質 / 商品 / 料金 / 事例 / 選ばれる理由 / 代表 / エリア / FAQ / コラム / CTA / 店舗情報） | 静岡 人工芝、静岡県 人工芝、静岡 人工芝 施工、人工芝 静岡市、人工芝 沼津 |
| `/about` | 静岡EASTについて・代表 髙橋祐子（E-E-A-T） | グリーンプランニング静岡EAST、人工芝 業者 静岡 |
| `/flow` | 施工の流れ（6ステップ） | 人工芝 施工 流れ |
| `/faq` | よくある質問（25問・7グループ・FAQPage） | 人工芝 よくある質問 |
| `/contact` | お問い合わせ・無料相談 | — |
| `/estimate` | 写真で概算見積り（写真アップロード付き） | 人工芝 見積もり 静岡、人工芝 写真 見積り |
| `/privacy` | 個人情報保護方針 | — |

### 用途別サービスページ（`src/data/services.ts`）

| パス | ターゲットキーワード |
| --- | --- |
| `/artificial-grass` | 静岡 人工芝 施工、人工芝 業者 静岡、人工芝 専門店 静岡 |
| `/garden` | 戸建て 庭 人工芝 静岡、新築 庭 人工芝、庭 リフォーム 人工芝 |
| `/dogrun` | 静岡 ドッグラン 人工芝、人工芝 犬 静岡、犬 庭 人工芝、人工芝 ペット |
| `/golf` | 静岡 ゴルフ 人工芝、自宅 パター練習 人工芝、パターグリーン 人工芝 |
| `/weed-control` | 静岡 庭 雑草対策、雑草 人工芝、草むしり 人工芝、防草シート 人工芝 |
| `/kids` | 子供 庭 人工芝、子ども 遊べる 庭、人工芝 裸足 |
| `/mansion` | マンション 専用庭 人工芝、マンション 人工芝 静岡 |
| `/balcony` | ベランダ 人工芝、バルコニー 人工芝、屋上 人工芝 |
| `/parking` | 駐車場 人工芝、駐車場 目地 人工芝、玄関 アプローチ 人工芝 |
| `/facility` | 人工芝 施工 法人 静岡、保育園 人工芝、店舗 人工芝 |
| `/exterior` | 外構 人工芝 静岡、庭 リフォーム 静岡、フェンス 人工芝 |

### 検索意図別ガイド（`src/data/guides.ts`）

| パス | ターゲットキーワード |
| --- | --- |
| `/price` | 人工芝 費用 静岡、人工芝 施工費用、人工芝 値段、人工芝 見積もり |
| `/how-to-choose` | 人工芝 選び方、人工芝 おすすめ、人工芝 芝丈 |
| `/diy-vs-pro` | 人工芝 DIY 業者、人工芝 DIY 失敗 |
| `/natural-grass` | 天然芝 人工芝 張り替え、天然芝 人工芝 どっち |
| `/maintenance` | 人工芝 お手入れ、人工芝 メンテナンス、人工芝 掃除 |
| `/lifespan` | 人工芝 何年持つ、人工芝 耐用年数、人工芝 寿命 |
| `/drainage` | 人工芝 水はけ、人工芝 水たまり、人工芝 排水 |
| `/heat` | 人工芝 夏 熱い、人工芝 表面温度、人工芝 暑さ対策 |

### 商品（`src/data/products.ts`）

`/products` と `/products/{amazing-turf, amazing-turf-lite, island-grass-type-r, island-grass-type-c, island-grass-type-g, golf-green, geofill}`。仕様・材料価格は本部公式（2026年9月確認）。「どんな人に向いているか」を独自に整理。

### 施工事例（`src/data/works.ts`）

`/works`、`/works/[slug]`、`/works/category/[category]`。**静岡EASTの施工と確認できた事例のみ**（現在は田方郡の天然芝→アメイジングターフ 1件）。Before/After スライダー、施工地域・面積・下地・工期・商品・悩み・提案・工程・施工後、`Article`＋`ImageObject` の構造化データ。

### 地域ページ（`src/data/areas.ts`）

`/area` と `/area/{numazu, mishima, fuji, fujinomiya, gotemba, shizuoka, fujieda, yaizu, izu}`。各ページに、その地域の地形・気候・住宅事情に基づく「気をつけていること」、対応できる施工、施工実績（あるものだけ）、流れ、料金、周辺地域、地域FAQ、店舗からの対応。**市名だけ入れ替えた量産ページにしないため、書けることがある市町にだけ作成。** 伊豆の各市町は `/area/izu` にまとめています。

### コラム

`/blog`、`/blog/[slug]`、`/blog/category/[slug]`、`/feed.xml`。初期記事4本（防草シート／犬のおしっこの臭い／新築の庭の比較／DIYの失敗）。

### その他

`/sitemap.xml`、`/robots.txt`、`/llms.txt`（AIクローラー向け要約）、`/manifest.webmanifest`、404。

---

## SEO・AIO 施策一覧

- **title / description をページごとに完全独自**（title 70文字以内・description 80〜160文字を全66ページで機械確認）
- **h1 は各ページ1つ**、見出し階層の飛びなし（監査スクリプトで確認）
- **canonical / OGP / Twitter Card** を `NEXT_PUBLIC_SITE_URL` から生成（未設定なら出さない）
- **インデックスの可否は `NEXT_PUBLIC_ALLOW_INDEXING` で一括制御**。既定は非公開（noindex）。下の「検索エンジンへの公開」を参照
- **構造化データ**：`HomeAndConstructionBusiness`（name / address / telephone / email / openingHours / areaServed 27市町 / sameAs / founder / parentOrganization）、`Organization`、`WebSite`、`BreadcrumbList`（全下層）、`FAQPage`（画面のFAQと同一内容のみ）、`Service`（用途・地域ページ）、`Product`（offers なし）、`Article`＋`ImageObject`（施工事例）、`BlogPosting`（コラム）、`Person`（代表）、`ItemList`。レビューが無いので `AggregateRating` は出しません
- **AIO**：各重要ページに「結論」「こんな方に向いています」「費用」「施工期間」「よくある質問」の構造。冒頭で質問に直接回答。「監修：グリーンプランニング静岡EAST 代表 髙橋祐子」を全サービス・ガイド・事例・コラムに表示。`/llms.txt` で entity 情報を要約
- **ローカルSEO**：NAP を `src/data/shop.ts` の単一ソースから全ページ・構造化データ・llms.txt に展開。対応エリア27市町を `areaServed` に。Googleマップ埋め込み。地域ページは独自情報のみ
- **内部リンク**：記事 → 用途ページ → 事例 → 商品 → 写真見積り の導線。全ページのフッターに用途・ガイド・商品・エリアへの導線。孤立ページなし（監査で確認）
- **画像**：`next/image`（AVIF/WebP、実寸指定、lazy、priority は LCP 画像のみ）。alt は写っているものを書き、静岡での施工と確認できた写真にだけ地域名を入れています。本部トップのAI生成風イメージは不使用
- **パフォーマンス**：日本語 `next/font` を使わず、見出しフォント（Zen Kaku Gothic New 500のみ）を自前ホストし、幅1024px以上でだけ非同期読み込み（スマホは端末標準フォント）。画面外のセクションは `content-visibility: auto`（`.cv`）で初回レイアウトを軽量化。`Reveal` はサーバーコンポーネントの印だけにして、監視は `RevealObserver` 1つに集約。地図は lazy iframe。JSを増やすライブラリは未使用
- **ローカル計測（Lighthouse 12・本番ビルド）**：デスクトップ Perf 98〜99 / A11y 100 / BP 100 / SEO 100。モバイル（simulated 4G・CPU4x）は Perf 83〜94 でばらつきます（Lighthouse の Lantern シミュレーションが LCP を 3〜4.4秒と見積もるため）。Playwright で実際に CPU 4倍・1.6Mbps に絞って計測した LCP はトップ約1.1〜1.2秒、/dogrun 約1.4秒です。A11y・BP・SEO は全ページ100。本番（Vercel・実機フォント）では PageSpeed Insights で再計測してください
- **徹底監査（2026-09-06）**：57ページ×5幅（360/390/768/1024/1440）で、コンソールエラー・失敗リクエスト・壊れた画像・横はみ出し・文字の切れ・重複id・aria参照切れ・入れ子の対話要素・未表示の要素が無いことを機械確認。操作テスト（メニュー開閉/ESC、下部バー、FAQ、写真見積りフォームの検証と写真縮小、相談フォーム、スライダーのキーボード操作、スキップリンク、地図の読み込み、RSS/sitemap の整形式）を通過
- **フォーム**：写真見積りは「まだ決めていない段階でも」のコピー。写真はブラウザで縮小してから送信。honeypot・容量制限
- **計測**：`NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GSC_VERIFICATION` で後から設定可能

---

## コラム自動投稿の仕組み

```
GitHub Actions（毎朝 9:30 JST / 手動実行も可）
  └ scripts/generate-blog-post.mjs
       ├ scripts/topics.mjs から未使用のトピックを1つ選ぶ（直近3本とカテゴリが続かないよう回転）
       ├ src/data/verified-facts.json の事実だけを system prompt に渡して Claude（既定 claude-haiku-4-5）に JSON で生成させる
       ├ 検証（最大3回まで書き直し）
       │   ・1,500〜3,500字、## 見出し4〜6本、h1 なし、「まとめ」「店舗情報」見出し禁止
       │   ・カテゴリごとの内部リンク（用途/事例/商品）を必ず含む、存在しないパスへのリンク禁止、外部リンク禁止
       │   ・金額は参考価格・材料価格の許可リストにある数字のみ
       │   ・市町村名＋「施工しました／ご依頼」の文は田方郡以外NG（架空の施工実績を弾く）
       │   ・キャンペーン・口コミ・No.1・絶対/100%・補助金/法律の断定・当店 を禁止
       │   ・過去記事とのタイトル類似（bigram Dice > 0.6）・本文類似（3-gram Dice > 0.35）を弾く
       ├ content/blog/YYYY-MM-DD-slug.md を書き出し
       └ typecheck + build が通ったら main に直接 push → Vercel が自動デプロイ
```

- 必要な GitHub Secrets：`ANTHROPIC_API_KEY`（それだけ）
- 任意の Variables：`CLAUDE_MODEL`、`NEXT_PUBLIC_SITE_URL`（ビルド確認用）
- `DRY_RUN_FIXTURE=path.json node scripts/generate-blog-post.mjs` で API を呼ばずに検証だけ試せます。`BLOG_DATE=2026-09-07` を付けると日付を変えて動作確認できます（その日の記事が既にあると何もしないため）
- トピックは `scripts/topics.mjs` に約70本。用途ページ・ガイドページと同じクエリは狙わず、「ひとつ細かい疑問」「地域の具体的な話」に寄せています。書き終えたら追加してください

---

## 画像の出典と扱い

`assets/originals`（git 管理外）に、本部公式サイトに掲載されている静岡EASTページ・施工事例・商品ページの写真を保存し、`scripts/prepare-images.mjs` で `public/photos` に最適化しています。

- 静岡EASTの一次情報：田方郡の施工写真3枚、施工の様子・施工後2枚、代表写真
- ブランド共通：庭・マンション・ベランダ・ドッグラン・ゴルフ・駐車場・玄関の施工写真、参考価格の Before/After、商品断面、工場
- 不使用：本部トップのメインビジュアルなど AI生成風のイメージ画像、キャラクターが写った園庭写真、実績バッジ画像

alt は写っているものを書き、静岡で施工したと確認できない写真に「静岡施工」とは書いていません。

商品7点の写真は、本部の商品ページが使っている拡大版（`<商品名>_zoom.jpg`）と同一の写真であることを確認済みです。断面の形（タイプRは扁平、タイプCはC型、タイプGは10mmのクリンプ2色）が本文の説明と一致します。

写真を指定するフィールドはすべて `PhotoKey` 型で、綴りを間違えるとビルドが止まります。`getPhoto()` の既定値へ黙って差し替わることはありません（ブログの `eyecatch` だけは生成スクリプト側で検証）。

---

## 追加すると SEO がさらに強くなる一次情報

1. **静岡EASTの施工事例**（最重要）：施工地域（市町）・面積・下地・工期・商品・Before/After 写真がそろった事例を `src/data/works.ts` に追加。特に沼津・三島・富士・御殿場・静岡市の事例があると、地域ページの `workSlugs` に紐づけて「実績のある地域ページ」になります
2. **Instagram の施工写真の使用許可**：ドッグラン・施設・ゴルフ・ゴムチップ・防球ネットの写真が使えれば、用途ページの写真を静岡EASTの一次情報に置き換えられます
3. **お客様の声**（本人同意のあるもの）：`Review` 構造化データと、用途ページへの掲載
4. **Googleビジネスプロフィール**の登録・URL：`sameAs` に追加し、口コミ導線を置けます
5. **代表の顔写真（施工現場・作業中）**と、施工チームの体制
6. **料金の静岡EAST独自の事例価格**（本部参考価格に加えて）
7. **保証書・延長保証プランの内容**（金額・条件）
8. **法人取引先の実績**（掲載許可のあるもの）
9. **本番ドメイン**：`NEXT_PUBLIC_SITE_URL` の設定と、本部サイトの静岡EASTページからのリンク（本部→加盟店の被リンク）
10. **メディア掲載・イベント出店**などの地域の活動

---

## 検索エンジンへの公開

**現在このサイトは非公開（noindex）です。** 検索エンジンに載せるには、環境変数 `NEXT_PUBLIC_ALLOW_INDEXING` に `true` を設定して再デプロイしてください。それ以外の値・未設定はすべて非公開として扱います。

「うっかり公開」は検索結果から消すのに時間がかかる一方、「うっかり非公開」は環境変数を1つ足せば戻せます。取り返しのつく側を既定にしています。

| | 非公開（既定） | 公開（`NEXT_PUBLIC_ALLOW_INDEXING=true`） |
| --- | --- | --- |
| 各ページの `meta robots` | `noindex, nofollow` | `index, follow, max-image-preview:large` |
| `robots.txt` | 全面 `Disallow: /` | `Allow: /`（`/api/` のみ Disallow）＋ sitemap の場所 |
| `sitemap.xml` | 空 | 56URL |
| `X-Robots-Tag` ヘッダー | 全レスポンスに `noindex, nofollow` | 付けない |

`X-Robots-Tag` を付けているのは、HTMLに `meta` を置けないもの（画像・`/feed.xml`・`/llms.txt`・OG画像）もインデックスさせないためです。`meta robots` だけでは画像が検索結果に残ります。

> **注意**：noindex はクローラーへのお願いであって、アクセス制限ではありません。URLを知っていれば誰でも閲覧できます。関係者以外に一切見せたくない場合は、Vercel の Deployment Protection（パスワード保護）を併用してください。

---

## デプロイ

1. GitHub にリポジトリを作成して push
2. Vercel で Import → 環境変数 `NEXT_PUBLIC_SITE_URL`（本番ドメイン）、`RESEND_API_KEY`、`MAIL_FROM`、`MAIL_TO`、必要なら `NEXT_PUBLIC_GA_ID`、`NEXT_PUBLIC_GSC_VERIFICATION`
3. GitHub の Settings > Secrets and variables > Actions に `ANTHROPIC_API_KEY` を登録（コラム自動投稿）
4. www 有無は Vercel のドメイン設定でリダイレクトを統一（`NEXT_PUBLIC_SITE_URL` と同じ形に）
5. 公開してよくなったら `NEXT_PUBLIC_ALLOW_INDEXING=true` を追加して再デプロイ
6. Search Console にサイトマップ（`/sitemap.xml`）を送信
