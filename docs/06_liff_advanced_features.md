# 6. LIFF発展機能ガイド

このスターターが現状使っているLIFF機能は、`liff.init()` / `liff.isLoggedIn()` / `liff.isInClient()` / `liff.login()` / `liff.getProfile()`（`src/lib/liff.js`, `src/App.vue`）だけです。ここから先は、作りたいアプリに応じて発展機能を追加していく形になります。

実装を依頼する前に、必ず [developers.line.biz のLIFF APIリファレンス](https://developers.line.biz/ja/reference/liff/) で最新のメソッドシグネチャ・使用条件を確認してください（`@line/liff` はバージョンアップで仕様が変わることがあります。このリポジトリは `^2.30.0` を使用）。

## 6-1. 主要な発展機能

| 機能 | できること | 必要な事前設定 | 制約・注意点 |
| --- | --- | --- | --- |
| `liff.shareTargetPicker()` | 友だちやグループを選んでメッセージを送信 | LINE Developersコンソールで「シェアターゲットピッカー」を有効化 | サイズ制限なし。LINEミニアプリでも利用可能 |
| `liff.scanCodeV2()` | QRコード/バーコードの読み取り | コンソールで「Scan QR」を有効化 | LIFFブラウザで使うにはサイズ`Full`が前提（このスターターの構成では問題なし） |
| `liff.sendMessages()` | 現在のトークルームに直接メッセージを送信 | `chat_message.write`スコープが必要 | サイズ`Full`前提。**LINEミニアプリはScopeを個別変更できない仕様**（[docs/01](01_line_developers_setup.md)参照）のため、動作可否は事前に公式リファレンスで要確認 |
| サービスメッセージAPI | LINEミニアプリからユーザーへプッシュ通知を送る仕組み | チャネルアクセストークン（サーバー側でのみ扱う） | フロントエンドから直接呼べない。Vercelのサーバーレス関数（Node.js）を1本追加する必要あり（上級者向け、[docs/07](07_app_ideas.md)の上級案を参照） |
| `liff.getFriendship()` | LINE公式アカウントとの友だち関係を取得 | `profile`スコープ＋LINE公式アカウントとのリンクが必要 | 特別な設定なしで利用可能なことが多いが、公式アカウントとの連携設定は事前に必要 |
| `liff.permanentLink.createUrlBy()` | 今のページの永続リンクを生成（`shareTargetPicker`と組み合わせやすい） | 不要 | エンドポイントURLで始まるリンクのみ対応 |
| `liff.closeWindow()` | LIFFアプリを閉じる | 不要 | LINEアプリ内でのみ有効 |
| `liff.openWindow()` | LINE内ブラウザまたは外部ブラウザでURLを開く | 不要 | - |
| `liff.getOS()` / `liff.isInClient()` | 実行環境の判定 | 不要 | 既に`src/App.vue`で`isInClient()`を使用中。分岐処理の参考にする |

## 6-2. 実装の進め方

1. 上の表で、作りたい機能に必要なLIFF APIを確認する
2. [LIFF APIリファレンス](https://developers.line.biz/ja/reference/liff/) で該当メソッドのシグネチャ・使用条件をコピーする
3. [docs/05_working_with_gemini.md](05_working_with_gemini.md) のルールに沿って、`src/lib/liff.js`に関数を追加する形でGeminiに実装を依頼する
4. LINEアプリの実機で動作確認する（`shareTargetPicker`や`scanCodeV2`など多くの機能はLINEアプリ内でしか正しく動作しません。ローカルのブラウザ確認だけで済ませないよう注意してください）

## 6-3. 次のステップ

具体的にどんなアプリを作るかのヒントは [docs/07_app_ideas.md](07_app_ideas.md) を参照してください。
