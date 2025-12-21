/**
 * Dev Tools News Fetcher Script
 * Fetches latest news for developer tools from Google News RSS
 * Usage: node scripts/fetch-news-dev.js
 * 
 * This script is separate from fetch-news.js to avoid rate limiting.
 * Run with a time offset (e.g., 30 minutes after fetch-news.js)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

// devToolsデータをcompanies.tsから読み込む
const companiesPath = path.join(__dirname, '..', 'src', 'data', 'companies.ts');
const companiesContent = fs.readFileSync(companiesPath, 'utf-8');

const devToolsMatch = companiesContent.match(/export const devTools[^=]*=\s*(\[[\s\S]*?\]);/);
if (!devToolsMatch) {
  console.error('Failed to parse devTools from companies.ts');
  process.exit(1);
}

const devToolsJson = devToolsMatch[1]
  .replace(/'/g, '"')
  .replace(/,(\s*[}\]])/g, '$1')
  .replace(/(\w+):/g, '"$1":');
const devTools = JSON.parse(devToolsJson);

const allLocales = [
  { code: 'en', hl: 'en', gl: 'US', ceid: 'US:en', filename: 'news_dev_en.json' },
  { code: 'jp', hl: 'ja', gl: 'JP', ceid: 'JP:ja', filename: 'news_dev_jp.json' },
];

// コマンドライン引数で言語を指定可能
const args = process.argv.slice(2);
const localeArg = args.find(arg => arg.startsWith('--locale='));
const targetLocale = localeArg ? localeArg.split('=')[1] : null;

const locales = targetLocale
  ? allLocales.filter(l => l.code === targetLocale)
  : allLocales;

const MAX_NEWS_PER_TOOL = 5;

const extractImageFromDescription = (description) => {
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
};

const getFallbackImage = (keyword, index) => {
  const seed = `${keyword}-${index}`.replace(/\s/g, '-');
  return `https://picsum.photos/seed/${seed}/400/225`;
};

const buildOrQuery = (searchTerms) => {
  if (searchTerms.length === 1) {
    return searchTerms[0];
  }
  return searchTerms.map(term => `"${term}"`).join(' OR ');
};

const fetchNewsForTool = async (tool, locale) => {
  const query = buildOrQuery(tool.searchTerm);
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&num=${MAX_NEWS_PER_TOOL}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
  const apiUrl = `${RSS2JSON_API}?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'RSS fetch failed');

    return data.items.slice(0, MAX_NEWS_PER_TOOL).map((item, index) => {
      const extractedImage = extractImageFromDescription(item.description || '');
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description || '',
        thumbnail: extractedImage || item.thumbnail || getFallbackImage(tool.key, index),
      };
    });
  } catch (error) {
    console.error(`  Error fetching ${tool.displayName} (${locale.code}):`, error.message);
    return [];
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchNewsForLocale = async (locale) => {
  console.log(`\n=== Fetching ${locale.code.toUpperCase()} dev tools news ===\n`);
  const results = [];

  for (const tool of devTools) {
    console.log(`Fetching: ${tool.displayName}...`);
    const news = await fetchNewsForTool(tool, locale);

    const sortedNews = news.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    results.push({
      company: tool.key,
      displayName: tool.displayName,
      news: sortedNews,
    });

    console.log(`  Found ${news.length} articles`);
    await delay(8000); // 8 seconds delay between tools
  }

  return {
    fetchedAt: new Date().toISOString(),
    locale: locale.code,
    companies: results,
  };
};

const main = async () => {
  console.log('AI News Hub - Dev Tools News Fetcher');
  console.log('====================================');
  console.log(`Tools loaded: ${devTools.map(t => t.displayName).join(', ')}`);

  for (const locale of locales) {
    const data = await fetchNewsForLocale(locale);
    const outputPath = path.join(__dirname, '..', 'src', 'data', locale.filename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`\nSaved: ${locale.filename}`);
    console.log(`  Articles: ${data.companies.reduce((sum, c) => sum + c.news.length, 0)}`);
    
    if (locales.indexOf(locale) < locales.length - 1) {
      console.log('\nWaiting 30 seconds before next locale...');
      await delay(30000);
    }
  }

  console.log('\n✓ Dev tools news data updated successfully!');
};

main().catch(console.error);
