# グリーンプランニング静岡EAST 公式サイト — このリポジトリで作業するときの決まり

静岡県沼津市の実在する人工芝専門店「人工芝専門店グリーンプランニング静岡EAST」の公式サイトです。
ルートの `c:\projects\CLAUDE.md` に加えて、ここのルールを守ってください。

## 最優先のルール：確認できていないことは書かない

このサイトの一次情報は次の3つだけです。

1. 本部公式サイト <https://greenplanning.jp/>（静岡EASTページ、商品ページ、FAQ、施工実績、参考価格）
2. 公式Instagram <https://www.instagram.com/green_shizuoka/>
3. 本部サイトに掲載された静岡EASTの施工写真・代表写真（`assets/originals` → `public/photos`）

**ここにないことは、画面にもコラムにも書かないでください。** とくに次は禁止です。

- 架空の施工事例（確認できている静岡EASTの事例は `src/data/works.ts` の田方郡の1件のみ）
- 架空のお客様の声・口コミ・評価・受賞歴
- 本部公式にない価格・数値・性能（参考価格3例と材料価格のみ書ける）
- 「地域No.1」「最安」「絶対に生えない」「100%安全」などの根拠のない断定
- 本部サイトの文章のコピー（事実は使ってよいが、文章はすべて独自に書く）
- ブランド共通の写真（庭・ドッグラン・ゴルフ等）に「静岡で施工」と書くこと（alt も本文も）

正式な一覧は `src/data/verified-facts.json` の `facts` と `forbidden` にあります。**新しい事実（施工事例・価格改定など）が確認できたら、まずこのファイルと該当する data ファイルを直してください。** コラムの自動生成もここだけを見ています。

## 店舗情報の直し方

住所・電話・営業時間・メール・Instagram は **`src/data/shop.ts` だけ** を直します。ヘッダー・フッター・各ページ・構造化データ・`llms.txt`・RSS まで一度に反映されます。同じ値を他の場所に直接書かないでください。

本部公式の数値（1,300件・40,000㎡・5年品質保証・1年施工保証・耐久性約7〜10年）は `shop.brandFacts` にあります。本部サイトで更新があれば、ここと `verified-facts.json` を直します。

## データの置き場所

| 内容 | ファイル |
| --- | --- |
| 用途別サービスページ（/dogrun 等 11ページ） | `src/data/services.ts` |
| 検索意図別ガイド（/price 等 8ページ） | `src/data/guides.ts`（本文はMarkdown） |
| 商品（7点） | `src/data/products.ts`（仕様・価格は本部公式から） |
| 施工事例 | `src/data/works.ts`（静岡EASTの事例のみ） |
| 対応エリア・地域ページ（9ページ） | `src/data/areas.ts` |
| FAQ | `src/data/faq.ts` |
| 写真の実寸と alt | `src/data/photos.ts` |
| ナビ | `src/data/nav.ts` |

サービス・ガイドは `src/app/[slug]/page.tsx` の1つの動的ルートで描画しています。ページを足すときは data に1件追加し、`src/data/nav.ts` と `scripts/topics.mjs` の `validPaths` にもパスを足してください。

## 地域ページの決まり

「市名だけ入れ替えた量産ページ」を作らないこと。地域ページはその地域について書けること（地形・気候・住宅事情）がある市町にだけ作ります。施工実績が確認できていない市町に事例を書かないこと。伊豆の各市町は `/area/izu` の1ページにまとめています。

## 施工事例を足すとき

1. 写真を `assets/originals` に置き、`scripts/prepare-images.mjs` の MAP に追加して実行
2. `src/data/photos.ts` に実寸と alt（静岡での施工と確認できたものだけ地域名を入れる）
3. `src/data/works.ts` に1件追加（施工地域・面積・下地・工期・商品・悩み・提案・工程・施工後）
4. 該当する `src/data/areas.ts` の `workSlugs` に slug を追加
5. `scripts/topics.mjs` の `validPaths` に `/works/<slug>` を追加

## 書き方

- 敬体（です・ます）。一文は60文字を目安に短く
- 売り込みすぎない。「人工芝を敷く」ではなく「庭で何をしたいか」から書く
- 商品性能・保証・耐用年数・安全性は断定しすぎない（「目安」「条件による」）
- 検索キーワードの不自然な詰め込みは禁止。title / h1 / h2 / 本文 / FAQ / 内部リンクへ自然に分散させる
- 「当店」は使わない（「静岡EAST」「グリーンプランニング静岡EAST」）

## デザイン

- 白ベース（`--color-shiro`）に芝のグリーン（`--color-shiba`）、深い緑（`--color-fukami`）、生成り（`--color-kinari`）
- 写真を大きく、余白を広く、線は細く（`border-sen`）。角丸カード・グラデーション・巨大な数字カード・意味のない英語見出しは使わない
- 見出しは自前ホストの Zen Kaku Gothic New（`.display`）、本文は端末標準のゴシック
- 元写真が800px幅までしかないため、写真を画面幅いっぱいに引き伸ばさない（分割レイアウトにする）

### Tailwind v4 の注意

カスタムクラスは必ず `@layer components` の中に書いてください。`globals.css` に素で書くとユーティリティを打ち消します。

### アニメーション

`Reveal` コンポーネント（IntersectionObserver + CSS）だけを使います。隠すスタイルは `html.js` の下でのみ効くので、JSが無効でも本文は見えます。`prefers-reduced-motion` で全部止まります。ライブラリを足さないでください。

## フォント

`next/font/google` に日本語フォントを渡してはいけません（unicode-range 分割の @font-face が数百個入り、レンダリングブロックCSSが数百KBになります）。見出しフォントは `npm run fonts:fetch` で `public/fonts` に落とし、`layout.tsx` の inline script から非同期に読み込んでいます。

## ロゴ・ファビコン

- 元データは `public/logo.jpg`（本部ブランドロゴ：犬のイラスト＋Green Planning）。`npm run brand:make` で `public/brand/logo.png`（白を透過）・`logo-mark.png`・`src/app/icon.png`・`apple-icon.png`・`public/icon-192/512.png`・`public/og.jpg`（写真＋ロゴ）を生成する
- ヘッダーとフッターは `components/layout/Logo.tsx`。透過ロゴは白〜生成りの背景でだけ使う（濃い緑の上では犬の白い部分が透ける）
- ロゴを差し替えるときは `public/logo.jpg` を置き換えて `npm run brand:make` を実行する

## 画像

- **写真を指定するフィールドは必ず `PhotoKey` 型にする。** `string` にすると綴りを間違えても型で気づけず、`getPhoto()` が既定の写真に差し替えてしまう（実際に地域ページ4件がこれで同じ写真になっていた）。型で縛れないのはブログのフロントマターの `eyecatch` だけで、そこは生成スクリプト側で検証している
- **写真は「写っているもの」と使う文脈を合わせる。** マンション専用庭の写真を法人・施設ページに使うといった転用をしない。合う写真がなければ、内容を限定しない写真（`gardenFlowerbedWide` や `turfRollsWide`）を使う
- 必ず `components/ui/Photo.tsx` を使う。`fill` のときは親に `relative` と高さを持たせる
- `quality` は `next.config.ts` の `images.qualities`（62 / 70 / 78）にある値だけ
- 実寸は `src/data/photos.ts` に持たせる（CLS対策）
- 本部トップのAI生成風イメージ画像（main_pc2026 / area_head / cta_bg / bg_security）は使わない

## 検索エンジンへの公開（現在は非公開）

インデックスの可否は `NEXT_PUBLIC_ALLOW_INDEXING` の1つで決まります（`src/lib/site.ts` の `allowIndexing`）。**既定は非公開**で、`true` を明示したときだけ公開になります。`NEXT_PUBLIC_SITE_URL` も必要です。

false のときは、meta robots・`robots.txt`・`sitemap.xml`・`X-Robots-Tag`（`next.config.ts`）の4つが同時に非公開側になります。**どれか1つだけを直さないでください。** 画像やRSSは meta タグを置けないので、`X-Robots-Tag` が無いと検索結果に残ります。

`isPublic`（＝`NEXT_PUBLIC_SITE_URL` の有無）は canonical / OG の出し分け専用です。インデックスの判定に使わないでください。

## 構造化データ

- `FAQPage` には**画面に出している質問と同じ内容だけ**を渡す
- `HomeAndConstructionBusiness` は `LocalBusiness` の下位型。両方を別々に出さない
- レビューが無いので `AggregateRating` は出さない。価格は施工料別のため `Product` に `offers` を出さない

## フォーム

`/estimate`（写真見積り）と `/contact` は `src/app/api/inquiry/route.ts` に送信し、Resend の REST API でメールを送ります。`RESEND_API_KEY` が無いと 503 を返し、画面は電話・メールの案内に切り替わります。写真は送信前にブラウザで縮小しています（Vercel の本文サイズ上限 4.5MB のため）。

## コラム（ブログ）

`content/blog/*.md` を GitHub Actions（毎朝 9:30 JST）が1本ずつ足します。`scripts/generate-blog-post.mjs` の検証は、価格・施工事例・誇張表現・内部リンク・類似度を機械的に弾きます。トピックは `scripts/topics.mjs`。用途ページ・ガイドページと同じクエリを狙わないこと。

## 変更したら

```bash
npm run typecheck && npm run lint && NEXT_PUBLIC_SITE_URL=https://example.com npm run build
```

3つとも通ることを確認してからコミットしてください。
