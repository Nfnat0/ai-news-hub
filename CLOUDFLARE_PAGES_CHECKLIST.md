# Cloudflare Pages 公開チェックリスト

このチェックリストに従って、Cloudflare Pagesでサイトを公開してください。

## ✅ 公開前の確認

- [ ] GitHubにリポジトリをプッシュ済み
- [ ] `.github/workflows/` に4つのワークフローファイルが存在する
- [ ] ローカルでビルドが成功する（`npm run build`）

## ✅ Cloudflare Pages 設定

1. [ ] [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. [ ] **Workers & Pages** → **Pages** を選択
3. [ ] **Create a project** をクリック
4. [ ] プロジェクト名を `ai-dogdock` に設定

## ✅ GitHub Secrets 設定

1. [ ] GitHubでリポジトリを開く
2. [ ] **Settings** → **Secrets and variables** → **Actions**
3. [ ] 以下のSecretsを追加:
   - [ ] `CLOUDFLARE_API_TOKEN` - Cloudflare API Token
   - [ ] `CLOUDFLARE_ACCOUNT_ID` - CloudflareアカウントID

## ✅ 初回デプロイ

### 方法1: 自動デプロイ（推奨）
- [ ] コードをプッシュ
- [ ] **Actions** タブでワークフローの実行を確認
- [ ] 緑色のチェックマークが表示されるまで待つ（約3-5分）

### 方法2: 手動デプロイ
- [ ] **Actions** タブを開く
- [ ] 任意のワークフローをクリック
- [ ] **Run workflow** ボタンをクリック
- [ ] 実行完了を待つ

## ✅ 公開確認

- [ ] Cloudflare Dashboard → **Pages** で公開URLを確認
- [ ] URLをブラウザで開く
- [ ] サイトが正しく表示されることを確認
- [ ] ニュースカードが表示されることを確認
- [ ] 画像が読み込まれることを確認

## ✅ 動作確認

- [ ] Hero Sectionが表示される
- [ ] AI Companiesタブのニュース行が表示される
- [ ] Dev Toolsタブのニュース行が表示される
- [ ] カードをクリックするとニュース記事が開く
- [ ] 言語切り替えが動作する（EN/JP）
- [ ] Linksページが表示される

## 🔧 トラブルシューティング

### ワークフローがエラーになる場合

1. [ ] **Actions** タブでエラーログを確認
2. [ ] Cloudflare API Tokenの権限を確認
3. [ ] Account IDが正しいか確認
4. [ ] ワークフローを再実行

### 画像が表示されない場合

1. [ ] ブラウザの開発者ツールでエラーを確認
2. [ ] ニュースデータを更新: ワークフローを手動実行
3. [ ] フォールバック画像が表示されるか確認

## 📝 次のステップ

- [ ] カスタムドメインを設定（オプション）
- [ ] OGP画像を設定（オプション）
- [ ] Google Analyticsを追加（オプション）
- [ ] 定期的にニュースが更新されることを確認

## 🎉 完了！

すべてのチェックが完了したら、サイトが公開されています！

---

問題が発生した場合は、[DEPLOYMENT.md](./DEPLOYMENT.md) の詳細ガイドを参照してください。
