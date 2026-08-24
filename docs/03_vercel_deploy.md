# 3. Vercelへのデプロイ

## 3-1. GitHubへpush

このリポジトリ（またはこの雛形から作成した自分のリポジトリ）をGitHubへpushしておきます。

## 3-2. Vercelプロジェクトの作成

1. [Vercel](https://vercel.com/) にGitHubアカウントでログイン
2. 「Add New...」→「Project」から、pushしたGitHubリポジトリを選択してインポート
3. Framework Preset は自動で **Vite** が検出されます（検出されない場合は手動でViteを選択）
4. 「Environment Variables」に以下の3つを追加
   - `VITE_LIFF_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   （それぞれ `.env` に設定した値と同じものを入力）
5. 「Deploy」をクリック

## 3-3. デプロイURLをLIFFに反映

1. デプロイ完了後に発行されるURL（`https://xxxx.vercel.app` など）をコピー
2. LINE Developers Console → 作成したLIFFアプリの設定画面に戻り、「エンドポイントURL」（本番用）をこのURLに更新
3. LINEアプリでこのLIFF URL（`https://miniapp.line.me/{LIFF ID}`）を開き、動作確認

## 3-4. コードを更新したら

`main` ブランチにpushすると自動で再デプロイされます。環境変数を追加・変更した場合は、Vercelの「Deployments」タブから **Redeploy** を手動で実行してください（`VITE_` 変数はビルド時に埋め込まれるため、環境変数だけ変更しても自動では反映されません）。
