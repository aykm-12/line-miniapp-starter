# Git の基本手順（初心者向け）

このドキュメントでは、コード変更を保存して Vercel にデプロイするまでの git コマンドの使い方を説明します。

## 全体の流れ

```
ファイル編集 → git add → git commit → git push → Vercel が自動デプロイ
```

## ステップ 1：ファイルを編集する

VSCode など好きなエディタで、`src/` 以下のコンポーネント、ページ、設定ファイルなどを編集します。

例：`src/components/SampleList.vue` を編集した場合

## ステップ 2：編集内容を確認する

ターミナルで以下を実行して、どのファイルが変更されたかを確認します。

```bash
git status
```

出力例：
```
On branch main

Changes not staged for commit:
  (use "git add <file>..." to stage for changes)
        modified:   src/components/SampleList.vue

Untracked files:
  (use "git add <file>..." to track)
        src/utils/helper.js
```

## ステップ 3：変更をステージに追加する（git add）

変更されたすべてのファイルをステージに追加します。

```bash
git add .
```

**何をしている？**
- `git add .` は、現在のディレクトリ以下のすべての変更を「コミット対象」に指定します
- `.` は「現在のディレクトリ以下すべて」を意味します

**特定ファイルだけを追加する場合：**
```bash
git add src/components/SampleList.vue
```

## ステップ 4：コミットメッセージ付きでコミットする（git commit）

変更内容を説明するメッセージ付きでコミットします。

```bash
git commit -m "変更内容をここに書く"
```

**コミットメッセージの書き方（例）：**

```bash
# 新機能を追加した場合
git commit -m "ユーザー情報表示機能を追加"

# バグを修正した場合
git commit -m "リストの表示順序がおかしい問題を修正"

# スタイルを変更した場合
git commit -m "ボタンのサイズを調整"

# 複数行メッセージを書きたい場合は、-m を複数回使用
git commit -m "タイトル" -m "詳しい説明が入ります"
```

**良いメッセージ：**
- 短く、分かりやすい（20文字程度が目安）
- 何を「した」かが分かる（「バグ修正」ではなく「○○のバグを修正」）
- 日本語でOK

**良くないメッセージ：**
- `git commit -m "update"` ← 何を変更したか不明
- `git commit -m "fix"` ← 何を修正したか不明

## ステップ 5：変更をリモートリポジトリにプッシュする（git push）

ローカルの git リポジトリ（あなたのパソコン）の変更を、GitHub（オンライン）にアップロードします。

```bash
git push
```

このコマンドを実行すると：
1. GitHub に変更がアップロードされる
2. Vercel が自動的に検出して、本番環境を再ビルド
3. 数秒～数十秒で LINE ミニアプリが更新される

**プッシュ後の確認：**

GitHub を開いて、最新のコミットが表示されていることを確認してください。

## よくあるエラーと対処法

### エラー 1：`git add` 後に編集を続けた場合

```bash
# ファイルを編集
# git add .
# (さらにファイルを編集)
# git commit
```

この場合、最新の編集内容は反映されません。もう一度 `git add` を実行してください。

```bash
git add .
git commit -m "再度追加して修正内容をコミット"
```

### エラー 2：コミットメッセージがなくて進まない場合

```bash
git commit -m ""
```

のようにメッセージを省略した場合、エディタが開く場合があります。その場合は：

```
# メッセージを入力したら Ctrl+S（Mac は Cmd+S）で保存
# その後 Ctrl+X（Mac は Cmd+X）で終了
```

または、最初から `-m "メッセージ"` を付けることをお勧めします。

### エラー 3：`git push` で認証エラーが出た場合

```
fatal: Authentication failed
```

この場合、GitHub との認証設定が必要です。以下を実行してください：

**Mac / Linux の場合：**
```bash
git credential approve
host=github.com
protocol=https
username=your-github-username
password=your-personal-access-token
```

**Windows の場合：**
認証情報マネージャーで GitHub の認証を設定してください。

不明な場合は [GitHub公式ドキュメント](https://docs.github.com/ja/authentication) を参照するか、教員に相談してください。


## その他の便利なコマンド

### 最新の変更を確認する

```bash
# 直前のコミットを見る
git log --oneline -5

# 出力例：
# a1b2c3d バグ修正
# e4f5g6h 新機能追加
# i7j8k9l ボタンスタイル変更
```

### ステージに追加したファイルを取り消す

```bash
git reset
```

### 直前のコミットをやり直す

```bash
# コミットメッセージが間違っていた場合
git commit --amend -m "正しいメッセージ"

# ファイルをコミットに追加したい場合
git add forgotten-file.js
git commit --amend --no-edit
```

**注意：** `git commit --amend` は、すでに push した場合は避けてください。

## まとめ

最も基本的な流れ：

```bash
# 1. ファイルを編集
# 2. git add .
# 3. git commit -m "何を変更したか"
# 4. git push
```

これだけで OK です。わからないことがあれば、質問してください！
