# AI News Hub

A Netflix-style UI for aggregating the latest news from major AI companies with multi-language support.

## Overview

Displays news from Google AI, OpenAI, Microsoft AI, Anthropic, xAI, and Anysphere in horizontally scrollable card rows with brand-colored titles.

## Features

- **Multi-language Support**: Toggle between English (EN) and Japanese (JP) news
- **Hero Carousel**: Auto-sliding (5s interval) with manual navigation, pauses on hover
- **Company News Rows**: Horizontally scrollable cards with brand-colored titles (newest on left)
- **Brand Colors**: Each company row title uses their official brand color
- **NEW Badge**: Articles within 24 hours display a glowing "NEW" badge
- **Official Links**: Separate tab with direct links to company websites
- **Seamless Design**: Deep black (#141414) background throughout for Netflix-style experience

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
3. Assigns fallback images for missing thumbnails
4. Saves to `news_en.json` and `news_jp.json`

**Recommended**: Run this script periodically (e.g., via cron or CI/CD) to keep news fresh.

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
| Anysphere | #7C3AED (Violet) |

## APIs Used

### rss2json API
- URL: `https://api.rss2json.com/v1/api.json`
- Purpose: Convert Google News RSS to JSON
- Limit: 10,000 requests/day (free tier)

### Picsum Photos (Fallback Images)
- URL: `https://picsum.photos/seed/{keyword}/800/450`
- Purpose: Reliable placeholder images when news thumbnails are unavailable

## Deployment

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
