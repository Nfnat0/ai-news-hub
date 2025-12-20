# GitHub Pages デプロイガイド

このプロジェクトをGitHub Pagesで公開する手順を説明します。

## 前提条件

- GitHubアカウントを持っていること
- リポジトリが既にGitHubにプッシュされていること

## デプロイ手順

### 1. リポジトリの設定を確認

リポジトリ名が `ai-news-hub` であることを確認してください。
もし異なる名前の場合は、`vite.config.ts` の `base` 設定を変更してください。

```typescript
// vite.config.ts
base: process.env.GITHUB_ACTIONS ? '/あなたのリポジトリ名/' : '/',
```

### 2. GitHub Pagesを有効化

1. GitHubでリポジトリを開く
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで **GitHub Actions** を選択

![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

### 3. ワークフローを実行

#### 自動実行（推奨）
- コードをプッシュすると自動的にデプロイされます
- 6時間ごとにニュースが自動更新されます

#### 手動実行
1. リポジトリの **Actions** タブを開く
2. 左サイドバーの **Update News and Deploy** をクリック
3. 右上の **Run workflow** ボタンをクリック
4. **Run workflow** を再度クリックして実行

### 4. デプロイの確認

1. **Actions** タブでワークフローの実行状況を確認
2. 緑色のチェックマークが表示されたら成功
3. **Settings** → **Pages** で公開URLを確認

公開URL: `https://あなたのユーザー名.github.io/ai-news-hub/`

## トラブルシューティング

### エラー: "Some specified paths were not resolved"

**原因**: キャッシュ設定の問題

**解決方法**:
1. **Actions** タブ → **Caches** で古いキャッシュを削除
2. ワークフローを再実行

### エラー: "404 Page Not Found"

**原因**: `base` 設定が正しくない

**解決方法**:
1. `vite.config.ts` の `base` 設定を確認
2. リポジトリ名と一致しているか確認
3. 修正してプッシュ

### ビルドエラー

**解決方法**:
1. ローカルでビルドを確認
   ```bash
   npm run build
   npm run preview
   ```
2. エラーがあれば修正してプッシュ

## ローカルでのテスト

GitHub Pagesと同じ環境でテストする方法:

```bash
# ビルド
npm run build

# プレビュー（GitHub Pagesと同じbase pathで）
GITHUB_ACTIONS=true npm run build
npm run preview
```

ブラウザで `http://localhost:4173/ai-news-hub/` を開いて確認

## 自動更新の設定

ワークフローは以下のスケジュールで自動実行されます:
- UTC 0時（日本時間 9時）
- UTC 6時（日本時間 15時）
- UTC 12時（日本時間 21時）
- UTC 18時（日本時間 3時）

スケジュールを変更する場合は `.github/workflows/update-news.yml` を編集:

```yaml
on:
  schedule:
    - cron: '0 */6 * * *'  # 6時間ごと
```

## カスタムドメインの設定（オプション）

独自ドメインを使用する場合:

1. **Settings** → **Pages** → **Custom domain** にドメインを入力
2. DNSレコードを設定
   - Aレコード: GitHubのIPアドレス
   - CNAMEレコード: `あなたのユーザー名.github.io`
3. **Enforce HTTPS** にチェック

詳細: https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site

## 参考リンク

- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [Vite デプロイガイド](https://vitejs.dev/guide/static-deploy.html)
