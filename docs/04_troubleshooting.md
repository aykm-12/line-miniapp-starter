# 4. トラブルシューティング

## Q. Vercelにデプロイしたら「初期化エラー」画面が出る（ローカルでは動いていた）

**原因**: `VITE_LIFF_ID` などの環境変数がVercel側のプロジェクト設定に入っていない、または入れたのに再デプロイしていない。

**対処**:
- Vercelの Project Settings → Environment Variables に3つの変数が全て入っているか確認
- 環境変数を追加・変更した後は、Deployments タブから Redeploy を実行する（`VITE_*` はビルド時にコードへ埋め込まれるため、再デプロイしないと反映されません）

## Q. LINEアプリで開くとログインが繰り返される / 「Guest」として扱われる

**原因**: 主に以下のいずれか
- LINE DevelopersのLIFFアプリ設定の「エンドポイントURL」が、実際のVercelデプロイURLと一致していない
- `VITE_LIFF_ID` の値が間違っている、またはコピー時に余分な空白が入っている

**対処**:
- LIFFアプリ設定のエンドポイントURLを最新のVercel URLに更新する（`https://` を含め完全一致させる）
- `.env` / Vercelの環境変数の `VITE_LIFF_ID` を再確認する

## Q. Supabaseへの読み書きが失敗する / 何も表示されない

**原因**: Row Level Security (RLS) のポリシーが設定されていない、または `supabase/schema.sql` を実行し忘れている。

**対処**:
- SupabaseのSQL Editorで `supabase/schema.sql` を実行したか確認
- Table Editorで対象テーブルを開き、右上の「RLS」表示と、Policies タブでポリシーが存在するか確認

## Q. `service_role key` と `anon key` の違いがわからない

- `anon key`: クライアント（ブラウザ）に公開してよい鍵。RLSポリシーの範囲内でしかデータへアクセスできない
- `service_role key`: RLSを無視して全データにアクセスできる強力な鍵。**絶対にフロントエンドのコードや `.env` の `VITE_` 変数に入れない**。サーバー側処理が必要になった場合のみ、Vercelのサーバーレス関数（環境変数はサーバー側のみに設定）から使う

## Q. ローカルでは動くが本番ビルド（`npm run build` → `npm run preview`）で崩れる

- Tailwindのクラスが本番ビルドで反映されない場合、`vite.config.js` に `tailwindcss()` プラグインが入っているか確認する
- コンソールにCORSエラーが出る場合は、Supabaseプロジェクトの設定ではなく、`VITE_SUPABASE_URL` のタイプミス（末尾のスラッシュ有無など）を疑う
