# 人工芝専門店グリーンプランニング静岡EAST 公式サイト（非公開・再構築中）

静岡県沼津市の「人工芝専門店グリーンプランニング静岡EAST」の独自Webサイトです。

> **現在の状態**
> 本部から、本部サイトの文章・画像・構成に似た内容があるとの指摘を受けました。
> そのため、該当する文章・画像・ページをすべて削除しました。いまは店舗の事実だけを載せた最小構成です。
> 本部の確認・承認を得るまでは一般公開しません。本番環境には Basic 認証がかかり、検索エンジンにも載りません。

Next.js 16（App Router）+ TypeScript + Tailwind CSS v4。

---

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー（Basic 認証なし） |
| `npm run build` / `npm start` | 本番ビルド・起動（Basic 認証あり） |
| `npm run typecheck` / `npm run lint` | 型チェック・Lint |
| `npm run images:prepare` | 本部提供画像（`assets/provided`）を `public/` に配置 |
| `npm run fonts:fetch` | 見出しフォントを `public/fonts` に取得 |

## 公開の条件

本部チェックリストにより、公開前に本部の確認・承認が必要です。コードでも次のように止めています。

| 状態 | 動作 |
| --- | --- |
| `NEXT_PUBLIC_ALLOW_INDEXING` が `true` 以外（既定） | Basic 認証（`src/proxy.ts`）と noindex・robots.txt Disallow・空の sitemap |
| `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` が未設定の本番環境 | 誰も閲覧できない（401） |
| `NEXT_PUBLIC_ALLOW_INDEXING=true` にしたが、`HQ_APPROVAL_NOTE` が空、パートナー区分が未確定、または画面に「要確認」が残っている | ビルドが失敗する |

## ページ

| パス | 内容 |
| --- | --- |
| `/` | 店名・パートナー区分・担当エリア・事業内容・店舗情報 |
| `/about` | 店舗情報・会社概要（代表挨拶の欄、本部との関係） |
| `/area` | 担当エリア（静岡県東部・中部・伊豆） |
| `/contact` | お問い合わせフォーム（Resend でメール送信） |
| `/privacy` | 個人情報保護方針 |

黄色の「要確認」の欄は、静岡EASTに文章・事実・写真を用意してもらう場所です。制作側やAIで文章を補って埋めません。

## 素材

- 画像は、本部が使用可として提供した画像（`assets/provided`、リポジトリには含めない）と、静岡EASTが撮影し使用許諾を得た写真だけを使います
- ロゴ・アイコンは本部指定のファイルを無加工で使います
- 本部から受け取った資料（チェックリスト等）はリポジトリに入れません（`.gitignore` 済み）

作業のルールは [CLAUDE.md](CLAUDE.md) にあります。
