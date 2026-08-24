# 1. LINE Developersの設定

## 1-1. プロバイダーの作成

1. [LINE Developers Console](https://developers.line.biz/console/) にLINEアカウントでログイン
2. 「新規プロバイダー作成」からプロバイダーを作成（会社名やチーム名など、任意の名前でOK）

## 1-2. LIFFアプリの作成

1. 作成したプロバイダーの中で「新規チャネル作成」→「LINEログイン」チャネルを作成
   - チャネル名・チャネル説明・大業種/小業種は任意でOK
2. 作成したチャネルの「LIFF」タブを開き、「追加」からLIFFアプリを新規作成
   - **サイズ**: Full を推奨（画面いっぱいに表示される）
   - **エンドポイントURL**: 最初は仮のURL（`https://example.com` など）でOK。Vercelへのデプロイ後に本物のURLへ更新します（[docs/03_vercel_deploy.md](03_vercel_deploy.md)参照）
   - **Scope**: `profile` にチェック（プロフィール取得に必要）
   - **ボットリンク機能**: 任意（LINE公式アカウントと連携する場合はON）
3. 作成後に表示される **LIFF ID**（`1234567890-AbCdEfGh` のような形式）をメモしておく

## 1-3. .env への設定

`.env` の `VITE_LIFF_ID` にメモしたLIFF IDを設定します。

```
VITE_LIFF_ID=1234567890-AbCdEfGh
```

## 1-4. 動作確認について

- ローカル開発中（`npm run dev`）はLINEアプリの外（PCブラウザ）からでもある程度動作確認できますが、`liff.login()` がブラウザのLINEログイン画面にリダイレクトします。
- 実機のLINEアプリで正しく開くには、後述のVercelデプロイ後に「エンドポイントURL」を実際のデプロイURLに更新する必要があります。
