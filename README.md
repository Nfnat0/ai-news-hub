# AI News Hub

A Netflix-style UI for aggregating the latest news from major AI companies and developer tools with multi-language support.

## Overview

Displays news from AI companies (Google AI, OpenAI, Microsoft AI, Anthropic, Amazon, xAI) and developer tools (Cursor, GitHub Copilot, VS Code, AWS Kiro, Antigravity) in horizontally scrollable card rows with brand-colored titles.

## Features

- **Multi-language Support**: Toggle between English (EN) and Japanese (JP) news
- **Two Content Categories**: AI Companies tab and Dev Tools tab
- **Hero Carousel**: Auto-sliding (5s interval) with manual navigation, pauses on hover - displays top news from each company
- **Company News Rows**: Horizontally scrollable cards with gradient brand-colored titles (newest on left)
- **Gradient Brand Colors**: Each company/tool row title uses beautiful gradient design based on their official brand colors
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
- **Deployment**: Cloudflare Pages

## Setup

```bash
# Install dependencies
npm install

# Fetch latest news data (both EN and JP)
npm run fetch-news        # AI companies news
npm run fetch-news-dev    # Dev tools news

# Start development server
npm run dev

# Build for production
npm run build
```

## Fetching News

The news data is stored in four files:
- `src/data/news_en.json` - English AI companies news (Google News US)
- `src/data/news_jp.json` - Japanese AI companies news (Google News JP)
- `src/data/news_dev_en.json` - English dev tools news (Google News US)
- `src/data/news_dev_jp.json` - Japanese dev tools news (Google News JP)

To update the news:

```bash
# Fetch AI companies news
npm run fetch-news

# Fetch dev tools news
npm run fetch-news-dev

# Fetch specific locale only
node scripts/fetch-news.js --locale=en
node scripts/fetch-news.js --locale=jp
node scripts/fetch-news-dev.js --locale=en
node scripts/fetch-news-dev.js --locale=jp
```

### Scripts

| Script | Description |
|--------|-------------|
| `scripts/fetch-news.js` | Fetches news for AI companies (Google, OpenAI, Microsoft, Anthropic, Amazon, xAI) |
| `scripts/fetch-news-dev.js` | Fetches news for dev tools (Cursor, GitHub Copilot, VS Code, AWS Kiro, Antigravity) |

**Recommended**: Run these scripts periodically (e.g., via cron or CI/CD) to keep news fresh.

## Automated Updates with GitHub Actions

The project includes GitHub Actions workflows that automatically:
- Fetch latest news every 6 hours
- Commit updated news data
- Build and deploy to Cloudflare Pages

### Workflow Schedule

| Workflow | Schedule (UTC) | Description |
|----------|----------------|-------------|
| `update-news-en.yml` | 3:00, 9:00, 15:00, 21:00 | English AI companies news |
| `update-news-jp.yml` | 0:00, 6:00, 12:00, 18:00 | Japanese AI companies news |
| `update-news-dev-en.yml` | 3:30, 9:30, 15:30, 21:30 | English dev tools news |
| `update-news-dev-jp.yml` | 0:30, 6:30, 12:30, 18:30 | Japanese dev tools news |

Dev tools workflows run 30 minutes after the main news workflows to avoid API rate limiting.

### Required Secrets

To enable automated deployment, configure these secrets in your repository:
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages deployment permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

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

### AI Companies

| Company | Color |
|---------|-------|
| Google AI | #4285F4 (Blue) - Rainbow gradient |
| OpenAI | #10A37F (Teal) |
| Microsoft AI | #00A4EF (Blue) |
| Anthropic | #D4A574 (Beige) |
| Amazon | #FF9900 (Orange) |
| xAI | #E8E8E8 (Silver) |

### Dev Tools

| Tool | Color |
|------|-------|
| Cursor | #00E5A0 (Mint) |
| GitHub Copilot | #F78166 (Coral) |
| VS Code | #007ACC (Blue) |
| AWS Kiro | #FF9900 (Orange) |
| Antigravity | #A855F7 (Purple) |

## APIs Used

### rss2json API
- URL: `https://api.rss2json.com/v1/api.json`
- Purpose: Convert Google News RSS to JSON
- Limit: 10,000 requests/day (free tier)

### Fallback Images
- Hero Section: PlaceDog API (`https://placedog.net/{width}/{height}`) - Cute dog images
- News Cards: Picsum Photos (`https://picsum.photos/seed/{keyword}/400/225`) - Random images

## Deployment

### Cloudflare Pages (Current)

This project is automatically deployed to Cloudflare Pages via GitHub Actions.

#### Setup

1. Create a Cloudflare Pages project named `ai-dogdock`
2. Configure repository secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to main branch to trigger deployment

#### Manual Deployment

```bash
npm run build
npx wrangler pages deploy dist --project-name=ai-dogdock
```

### Vercel (Alternative)
```bash
npm install -g vercel
vercel
```

### Netlify (Alternative)
```bash
npm run build
# Drag & drop dist folder to Netlify
```

## License

MIT - See [LICENSE](./LICENSE) for details.
