import { useState, useEffect } from 'react';
import type { NewsItem, CompanyNews } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NewsData {
    fetchedAt: string;
    locale: string;
    companies: {
        company: string;
        displayName: string;
        news: NewsItem[];
    }[];
}

export const useNews = () => {
    const { language } = useLanguage();
    const [companyNews, setCompanyNews] = useState<CompanyNews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                let data: NewsData;
                if (language === 'jp') {
                    const response = await import('../data/news_jp.json');
                    data = response.default as NewsData;
                } else {
                    const response = await import('../data/news_en.json');
                    data = response.default as NewsData;
                }

                const newsWithState: CompanyNews[] = data.companies.map((c) => ({
                    company: c.company,
                    displayName: c.displayName,
                    news: [...c.news].sort(
                        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
                    ),
                    loading: false,
                    error: null,
                }));

                setCompanyNews(newsWithState);
            } catch (error) {
                console.error('Failed to load news data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [language]);

    return { companyNews, loading };
};

export const useTopNews = (companyNews: CompanyNews[]): NewsItem[] => {
    const allNews = companyNews
        .flatMap((cn) => cn.news)
        .filter((n) => n.pubDate)
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return allNews.slice(0, 5);
};

export const isNewArticle = (pubDate: string): boolean => {
    const articleDate = new Date(pubDate).getTime();
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - articleDate < twentyFourHours;
};
