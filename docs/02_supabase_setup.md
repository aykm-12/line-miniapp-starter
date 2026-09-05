# 2. Supabaseの設定

## 2-1. Organizationとプロジェクトの作成

Supabaseでは、プロジェクトを作成する前に**Organization**（組織）の作成が必要です。Organizationは課金・プランの単位で、この配下に複数のプロジェクトを作成する構成になっています。

1. [Supabase](https://supabase.com/) にサインアップ/ログイン（githubアカウントでログインできます）
2. 初回は「New organization」の作成を促されます。Organization名を入力し、プランは **Free** を選択（個人開発や検証用途であればFreeで十分です。Freeプランでは1つのOrganizationにつきプロジェクトを2つまで作成できます）
3. 作成したOrganization内で「New project」からプロジェクトを作成（リージョンは Tokyo (ap-northeast-1) を選ぶとレイテンシが低くおすすめ）
4. データベースパスワードは後で使わないので、忘れても問題ありません（メモ推奨ではあります）
5. 「Security」欄のチェックボックスは全てチェックにしてください（このスターター向けの意味は以下の通り）
   - **Enable Data API**: ON（必須。supabase-jsが anon key でREST経由アクセスするために必要）
   - **Automatically expose new tables**: ON（OFFにすると新規テーブルにanon/authenticatedロールへの権限が自動付与されず、`schema.sql`のRLSポリシーを設定してもテーブル自体にアクセスできません。手動でGRANT文を管理する場合はOFFでも構いません）
   - **Enable automatic RLS**: ON（`schema.sql`側でも明示的にRLSを有効化していますが、今後追加するテーブルでRLSの有効化を忘れないための保険になります）

## 2-2. テーブルとRLSポリシーの作成

1. 左メニューの「SQL Editor」を開く
2. 「New query」を作成し、リポジトリ内の [`supabase/schema.sql`](../supabase/schema.sql) の内容をすべて貼り付けて実行（Run）
3. 「Table Editor」で `sample_items` テーブルが作成されていることを確認

> **RLSを忘れると何が起きる？**
> Row Level Security (RLS) を有効にしたテーブルは、ポリシーを設定しない限り `anon key` からの読み書きが全て拒否されます（エラーにはならず、0件のデータが返るだけのことが多く気づきにくいので注意）。`schema.sql` には最小限の許可ポリシーが含まれています。

## 2-3. APIキーの取得

Project URLとキーは、プロジェクト画面上部の **「Connect」** ボタンからまとめて取得するのが簡単です。

1. プロジェクト画面上部の「Connect」を開き、「Framework」（Use a client library）タブで **Vue** を選択
2. 表示されるコードスニペットから以下の2つをメモする
   - **Project URL** → `.env` の `VITE_SUPABASE_URL`
   - **anon / publishable key** → `.env` の `VITE_SUPABASE_PUBLISHABLE_KEY`

> 「Project Settings」→「API Keys」から直接確認することもできます。その場合は **「Publishable and secret API keys」**（新方式）タブを使ってください。**「Legacy anon, service_role API keys」**（旧方式、`anon`/`service_role`。2026年末に廃止予定）は使わないでください。この画面ではProject URLが表示されない場合があるので、その際は「Project Settings」→「General settings」の **Project ID** から `https://{Project ID}.supabase.co` の形式で組み立ててください。

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

> **注意**: 同じ画面にある **Secret key**（旧方式の `service_role key` に相当）は絶対にフロントエンド（`.env` の `VITE_` 変数）に入れないでください。この鍵はRLSを無視して全データにアクセスできる強力な鍵で、クライアントに公開すると誰でもデータベースを操作できてしまいます。**Publishable key** だけを使ってください。

## 2-4. プロジェクトの一時停止（Pause）と再開

Freeプランのプロジェクトは、**過去7日間データベースへのアクセス（APIリクエストなど）が全くないと自動的に一時停止（Pause）** されます。開発を数日〜数週間中断した後に「Supabaseへの読み書きが急に失敗するようになった」場合は、このPauseが原因である可能性が高いです。

> **注意**: 一時停止されてもデータは削除されません（一時停止から**最大1年間**は復旧可能）。ただし、Pro Planにアップグレードすると一時停止の対象外になります。

再開方法：

1. [Supabase](https://supabase.com/dashboard) にログインし、対象のOrganization・プロジェクトを選択
2. 一時停止中のプロジェクト画面で「Resume project」をクリック
3. 数分待つとプロジェクトが復旧し、データ・設定も元の状態に戻ります
