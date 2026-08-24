# 2. Supabaseの設定

## 2-1. プロジェクトの作成

1. [Supabase](https://supabase.com/) にサインアップ/ログイン
2. 「New project」からプロジェクトを作成（リージョンは Tokyo (ap-northeast-1) を選ぶとレイテンシが低くおすすめ）
3. データベースパスワードは後で使わないので、忘れても問題ありません（メモ推奨ではあります）

## 2-2. テーブルとRLSポリシーの作成

1. 左メニューの「SQL Editor」を開く
2. 「New query」を作成し、リポジトリ内の [`supabase/schema.sql`](../supabase/schema.sql) の内容をすべて貼り付けて実行（Run）
3. 「Table Editor」で `sample_items` テーブルが作成されていることを確認

> **RLSを忘れると何が起きる？**
> Row Level Security (RLS) を有効にしたテーブルは、ポリシーを設定しない限り `anon key` からの読み書きが全て拒否されます（エラーにはならず、0件のデータが返るだけのことが多く気づきにくいので注意）。`schema.sql` には最小限の許可ポリシーが含まれています。

## 2-3. APIキーの取得

1. 左メニューの「Project Settings」→「API」を開く
2. 以下の2つをメモする
   - **Project URL** → `.env` の `VITE_SUPABASE_URL`
   - **anon public key** → `.env` の `VITE_SUPABASE_ANON_KEY`

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

> **注意**: `service_role key` は絶対にフロントエンド（`.env` の `VITE_` 変数）に入れないでください。この鍵はRLSを無視して全データにアクセスできる強力な鍵で、クライアントに公開すると誰でもデータベースを操作できてしまいます。`anon key` だけを使ってください。
