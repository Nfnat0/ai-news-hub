# Cloudflare Pages デプロイガイド

このプロジェクトをCloudflare Pagesで公開する手順を説明します。

## 前提条件

- Cloudflareアカウントを持っていること
- GitHubアカウントを持っていること
- リポジトリが既にGitHubにプッシュされていること

## デプロイ手順

### 1. Cloudflare Pagesプロジェクトの作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** → **Pages** を選択
3. **Create a project** をクリック
4. プロジェクト名を `ai-dogdock` に設定

### 2. GitHub Secretsの設定

リポジトリの **Settings** → **Secrets and variables** → **Actions** で以下を設定:

| Secret名 | 説明 |
|----------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token（Pages編集権限が必要） |
| `CLOUDFLARE_ACCOUNT_ID` | CloudflareアカウントID |

#### API Tokenの作成方法

1. Cloudflare Dashboard → **My Profile** → **API Tokens**
2. **Create Token** をクリック
3. **Edit Cloudflare Workers** テンプレートを使用
4. **Account Resources**: 対象アカウントを選択
5. **Zone Resources**: All zones（または特定のゾーン）
6. トークンを作成してコピー

### 3. ワークフローの実行

#### 自動実行
- コードをプッシュすると自動的にデプロイされます
- 6時間ごとにニュースが自動更新されます

#### 手動実行
1. リポジトリの **Actions** タブを開く
2. 任意のワークフローを選択
3. **Run workflow** ボタンをクリック

### 4. デプロイの確認

1. **Actions** タブでワークフローの実行状況を確認
2. 緑色のチェックマークが表示されたら成功
3. Cloudflare Dashboard → **Pages** で公開URLを確認

## ワークフロー一覧

| ワークフロー | スケジュール (UTC) | 内容 |
|-------------|-------------------|------|
| `update-news-en.yml` | 3:00, 9:00, 15:00, 21:00 | 英語AI企業ニュース |
| `update-news-jp.yml` | 0:00, 6:00, 12:00, 18:00 | 日本語AI企業ニュース |
| `update-news-dev-en.yml` | 3:30, 9:30, 15:30, 21:30 | 英語開発ツールニュース |
| `update-news-dev-jp.yml` | 0:30, 6:30, 12:30, 18:30 | 日本語開発ツールニュース |

※ 開発ツール用ワークフローは、API制限を避けるためメインの30分後に実行

## トラブルシューティング

### エラー: "Authentication error"

**原因**: API TokenまたはAccount IDが正しくない

**解決方法**:
1. Cloudflare DashboardでAPI Tokenの権限を確認
2. Account IDが正しいか確認（Dashboard URLに含まれる）
3. GitHub Secretsを再設定

### エラー: "Project not found"

**原因**: Cloudflare Pagesプロジェクトが存在しない

**解決方法**:
1. Cloudflare Dashboardでプロジェクト名を確認
2. ワークフローの `--project-name` と一致しているか確認

### ビルドエラー

**解決方法**:
1. ローカルでビルドを確認
   ```bash
   npm run build
   npm run preview
   ```
2. エラーがあれば修正してプッシュ

## ローカルでのテスト

```bash
# ビルド
npm run build

# プレビュー
npm run preview
```

ブラウザで `http://localhost:4173/` を開いて確認

## 手動デプロイ

Wrangler CLIを使用した手動デプロイ:

```bash
# Wranglerをインストール
npm install -g wrangler

# ログイン
wrangler login

# ビルド
npm run build

# デプロイ
wrangler pages deploy dist --project-name=ai-dogdock
```

## カスタムドメインの設定（オプション）

1. Cloudflare Dashboard → **Pages** → プロジェクト選択
2. **Custom domains** タブ
3. **Set up a custom domain** をクリック
4. ドメインを入力して設定

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [Vite デプロイガイド](https://vitejs.dev/guide/static-deploy.html)
