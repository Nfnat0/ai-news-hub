/**
 * News Fetcher Script
 * Fetches latest AI news from Google News RSS in both Japanese and English
 * Usage: node scripts/fetch-news.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

const companies = [
  // { key: 'google', displayName: 'Google', searchTerm: ['Google AI', 'Gemini'] },
  { key: 'openai', displayName: 'OpenAI', searchTerm: ['OpenAI'] },
  // { key: 'microsoft', displayName: 'Microsoft', searchTerm: ['GitHub Copilot', 'Copilot AI'] },
  // { key: 'anthropic', displayName: 'Anthropic', searchTerm: ['Anthropic'] },
  // { key: 'amazon', displayName: 'Amazon', searchTerm: ['Kiro', 'Bedrock'] },
  // { key: 'xai', displayName: 'xAI', searchTerm: ['Grok'] },
  { key: 'anysphere', displayName: 'Anysphere', searchTerm: ['Cursor'] },
];

const locales = [
  // { code: 'en', hl: 'en', gl: 'US', ceid: 'US:en', filename: 'news_en.json' }, // 暫定的に無効化
  { code: 'jp', hl: 'ja', gl: 'JP', ceid: 'JP:ja', filename: 'news_jp.json' },
];

const extractImageFromDescription = (description) => {
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
};

const getFallbackImage = (keyword, index) => {
  const seed = `${keyword}-${index}`.replace(/\s/g, '-');
  return `https://picsum.photos/seed/${seed}/800/450`;
};

const fetchNewsForTerm = async (term, locale) => {
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
    term
  )}&hl=${locale.hl}&gl=${locale.gl}&ceid=${locale.ceid}`;
  const apiUrl = `${RSS2JSON_API}?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'RSS fetch failed');

    return data.items.map((item, index) => {
      const extractedImage = extractImageFromDescription(item.description || '');
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description || '',
        thumbnail: extractedImage || item.thumbnail || getFallbackImage(term, index),
      };
    });
  } catch (error) {
    console.error(`  Error fetching term "${term}" (${locale.code}):`, error.message);
    return [];
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchNewsForCompany = async (company, locale) => {
  const allNews = [];
  const seenLinks = new Set();

  // Fetch for all terms sequentially with delay
  for (const term of company.searchTerm) {
    const news = await fetchNewsForTerm(term, locale);
    if (news.length > 0) {
      for (const item of news) {
        if (!seenLinks.has(item.link)) {
          seenLinks.add(item.link);
          allNews.push(item);
        }
      }
    }
    await delay(10000); // 10 seconds delay between requests
  }

  return allNews.slice(0, 5); // Limit to top 15 combined
};

const fetchNewsForLocale = async (locale) => {
  console.log(`\n=== Fetching ${locale.code.toUpperCase()} news ===\n`);
  const results = [];

  for (const company of companies) {
    console.log(`Fetching: ${company.displayName}...`);
    const news = await fetchNewsForCompany(company, locale);

    const sortedNews = news.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    results.push({
      company: company.key,
      displayName: company.displayName,
      news: sortedNews,
    });

    console.log(`  Found ${news.length} articles`);
    await delay(8000); // 8 seconds delay between companies
  }

  return {
    fetchedAt: new Date().toISOString(),
    locale: locale.code,
    companies: results,
  };
};

const main = async () => {
  console.log('AI News Hub - Multi-language News Fetcher');
  console.log('==========================================');

  for (const locale of locales) {
    const data = await fetchNewsForLocale(locale);
    const outputPath = path.join(__dirname, '..', 'src', 'data', locale.filename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`\nSaved: ${locale.filename}`);
    console.log(`  Articles: ${data.companies.reduce((sum, c) => sum + c.news.length, 0)}`);
    
    // Wait between locales to avoid rate limiting
    if (locales.indexOf(locale) < locales.length - 1) {
      console.log('\nWaiting 30 seconds before next locale...');
      await delay(30000);
    }
  }

  console.log('\n✓ All news data updated successfully!');
};

main().catch(console.error);
