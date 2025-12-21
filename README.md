# AI News Hub

A Netflix-style UI for aggregating the latest news from major AI companies with multi-language support.

## Overview

Displays news from Google AI, OpenAI, Microsoft AI, Anthropic and xAI in horizontally scrollable card rows with brand-colored titles.

## Features

- **Multi-language Support**: Toggle between English (EN) and Japanese (JP) news
- **Hero Carousel**: Auto-sliding (5s interval) with manual navigation, pauses on hover - displays top news from each company
- **Company News Rows**: Horizontally scrollable cards with gradient brand-colored titles (newest on left)
- **Gradient Brand Colors**: Each company row title uses beautiful gradient design based on their official brand colors
- **NEW Badge**: Articles within 24 hours display a glowing "NEW" badge
- **Cute Animal Fallback Images**: When news thumbnails are unavailable, displays random cute animal images (dogs, cats, and more)
- **Official Links**: Separate tab with direct links to company websites
- **Seamless Design**: Deep black (#141414) background throughout for Netflix-style experience
- **Japanese Date Format**: Dates displayed in Japanese format (年月日)

## Tech Stack

- **Frontend**: React (TypeScript), Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Testing**: Vitest, Testing Library

## Setup

```bash
# Install dependencies
npm install

# Fetch latest news data (both EN and JP)
npm run fetch-news

# Start development server
npm run dev

# Build for production
npm run build
```

## Fetching News

The news data is stored in two files:
- `src/data/news_en.json` - English news (Google News US)
- `src/data/news_jp.json` - Japanese news (Google News JP)

To update the news:

```bash
npm run fetch-news
```

This runs `scripts/fetch-news.js` which:
1. Fetches news from Google News RSS for both EN and JP locales
2. Sorts all articles by date (newest first)
3. Assigns cute animal fallback images for missing thumbnails (dogs, cats, rabbits, etc.)
4. Saves to `news_en.json` and `news_jp.json`

**Recommended**: Run this script periodically (e.g., via cron or CI/CD) to keep news fresh.

## Automated Updates with GitHub Actions

The project includes a GitHub Actions workflow that automatically:
- Fetches latest news every 6 hours (UTC: 0, 6, 12, 18)
- Commits updated news data
- Builds and deploys to GitHub Pages

To enable:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will run automatically on schedule or can be triggered manually

## Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- **NewsCard.test.tsx**: Component rendering, image fallback, NEW badge behavior
- **imageValidation.test.ts**: Validates both EN/JP news.json structure, image URLs, and date sorting

## Brand Colors

| Company | Color |
|---------|-------|
| Google AI | #4285F4 (Blue) |
| OpenAI | #10A37F (Teal) |
| Microsoft AI | #00A4EF (Blue) |
| Anthropic | #D4A574 (Beige) |
| xAI | #E8E8E8 (Silver) |

## APIs Used

### rss2json API
- URL: `https://api.rss2json.com/v1/api.json`
- Purpose: Convert Google News RSS to JSON
- Limit: 10,000 requests/day (free tier)

### Fallback Images
- Hero Section: PlaceDog API (`https://placedog.net/{width}/{height}`) - Cute dog images
- News Cards: Picsum Photos (`https://picsum.photos/seed/{keyword}/400/225`) - Random images

## Deployment

### GitHub Pages (Recommended)

**自動デプロイ設定済み** - このプロジェクトはGitHub Actionsで自動デプロイされます。

#### 初回セットアップ

1. **GitHub Pagesを有効化**
   - リポジトリの **Settings** → **Pages**
   - **Source** を **GitHub Actions** に設定

2. **デプロイ実行**
   - コードをプッシュすると自動デプロイ
   - または **Actions** タブから手動実行

3. **公開URL**
   - `https://あなたのユーザー名.github.io/ai-news-hub/`

#### 自動更新
- 6時間ごとにニュースを自動取得してデプロイ
- UTC 0, 6, 12, 18時に実行

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop dist folder to Netlify
```

## License

MIT
