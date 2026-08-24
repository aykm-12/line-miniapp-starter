# LINEミニアプリ 雛形 (Vue + Vite + Supabase)

LINEミニアプリ（LIFF）をゼロから作るハンズオン用の雛形です。バックエンドサーバーは持たず、Vueアプリから直接Supabaseへ読み書きする構成になっています。

## スタック

- Vue 3 + Vite
- [@line/liff](https://developers.line.biz/ja/docs/liff/) — LINEアプリ内でのログイン・プロフィール取得
- [Supabase](https://supabase.com/) — DB（PostgreSQL）。`@supabase/supabase-js` でフロントから直接読み書き
- Tailwind CSS v4
- Vercel — 静的サイトとしてデプロイ（サーバーレス関数・バックエンドは使いません）

## セットアップ手順

はじめての場合は `docs/` 以下を順番に読み進めてください。

1. [docs/01_line_developers_setup.md](docs/01_line_developers_setup.md) — LINE Developersの設定
2. [docs/02_supabase_setup.md](docs/02_supabase_setup.md) — Supabaseプロジェクトの作成
3. ローカルで動かす
   ```bash
   npm install
   cp .env.example .env
   # .env に LIFF ID / Supabase の URL・anon key を設定
   npm run dev
   ```
4. [docs/03_vercel_deploy.md](docs/03_vercel_deploy.md) — Vercelへのデプロイ
5. うまく動かないときは [docs/04_troubleshooting.md](docs/04_troubleshooting.md) を確認してください。

### 次のステップ：自分のアプリを作る

デプロイまで完了したら、ここから自分のミニアプリを作っていきます。Gemini（チャットAI）とVSCodeで開発する場合は、以下も参考にしてください。

6. [docs/05_working_with_gemini.md](docs/05_working_with_gemini.md) — Geminiとの付き合い方（プロンプトのコツ・よくある失敗パターン）
7. [docs/06_liff_advanced_features.md](docs/06_liff_advanced_features.md) — LIFF発展機能ガイド（shareTargetPicker、scanCodeV2など）
8. [docs/07_app_ideas.md](docs/07_app_ideas.md) — 難易度別アプリ案リスト

## ディレクトリ構成

```
src/
  App.vue               # LIFF初期化 + プロフィール表示の最小サンプル
  lib/
    liff.js             # LIFF初期化ラッパー（未設定時は分かりやすいエラーを出す）
    supabase.js         # Supabaseクライアント生成
  components/
    SampleList.vue      # Supabaseへの読み書きサンプル（CRUDの最小形）
supabase/
  schema.sql            # サンプルテーブル定義 + RLSポリシー
docs/                    # セットアップ・デプロイ・トラブルシューティング手順
```

## 注意事項

- `VITE_` で始まる環境変数はビルド時にクライアントのJSへ埋め込まれます。ローカルの `.env` に設定しただけでは本番（Vercel）には反映されません。Vercelのプロジェクト設定にも同じ環境変数を追加し、追加後は再デプロイしてください。
- SupabaseのRLS（Row Level Security）設定を忘れると、`anon key` を使った読み書きが全て拒否されます。`supabase/schema.sql` を必ず実行してください。
