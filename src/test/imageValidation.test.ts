import { describe, it, expect } from 'vitest';
import newsDataEn from '../data/news_en.json';
import newsDataJp from '../data/news_jp.json';

const testNewsData = (newsData: typeof newsDataEn, locale: string) => {
    describe(`Image Validation (${locale})`, () => {
        it('news data is not empty', () => {
            expect(newsData.companies).toBeDefined();
            expect(newsData.companies.length).toBeGreaterThan(0);

            const totalArticles = newsData.companies.reduce((sum, c) => sum + c.news.length, 0);
            expect(totalArticles).toBeGreaterThan(0);
        });

        it('all news items have thumbnail URLs', () => {
            newsData.companies.forEach((company) => {
                company.news.forEach((news) => {
                    expect(news.thumbnail).toBeDefined();
                    expect(news.thumbnail).not.toBe('');
                    expect(
                        news.thumbnail.startsWith('http://') || news.thumbnail.startsWith('https://')
                    ).toBe(true);
                });
            });
        });

        it('fallback images use valid picsum.photos URLs', () => {
            const fallbackPattern = /^https:\/\/picsum\.photos\/seed\/[\w-]+\/\d+\/\d+$/;

            newsData.companies.forEach((company) => {
                company.news.forEach((news) => {
                    if (news.thumbnail.includes('picsum.photos')) {
                        expect(news.thumbnail).toMatch(fallbackPattern);
                    }
                });
            });
        });

        it('news items are sorted by date (newest first)', () => {
            newsData.companies.forEach((company) => {
                if (company.news.length === 0) return;
                const dates = company.news.map((n) => new Date(n.pubDate).getTime());
                const sortedDates = [...dates].sort((a, b) => b - a);
                expect(dates).toEqual(sortedDates);
            });
        });

        it('all news items have required fields', () => {
            newsData.companies.forEach((company) => {
                company.news.forEach((news) => {
                    expect(news.title).toBeDefined();
                    expect(news.title.length).toBeGreaterThan(0);
                    expect(news.link).toBeDefined();
                    expect(news.link).toMatch(/^https?:\/\//);
                    expect(news.pubDate).toBeDefined();
                });
            });
        });
    });
};

describe('Multi-language News Data Validation', () => {
    it('both EN and JP data files exist and have correct locale', () => {
        expect(newsDataEn.locale).toBe('en');
        expect(newsDataJp.locale).toBe('jp');
    });

    it('both EN and JP have fetchedAt timestamp', () => {
        expect(newsDataEn.fetchedAt).toBeDefined();
        expect(newsDataJp.fetchedAt).toBeDefined();
    });

    it('both EN and JP have companies with news', () => {
        expect(newsDataEn.companies.length).toBeGreaterThan(0);
        expect(newsDataJp.companies.length).toBeGreaterThan(0);

        const enTotal = newsDataEn.companies.reduce((sum, c) => sum + c.news.length, 0);
        const jpTotal = newsDataJp.companies.reduce((sum, c) => sum + c.news.length, 0);

        expect(enTotal).toBeGreaterThan(0);
        expect(jpTotal).toBeGreaterThan(0);
    });
});

testNewsData(newsDataEn, 'EN');
testNewsData(newsDataJp, 'JP');
