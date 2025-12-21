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

// ニュースを日付順にソート（新しい順）
const sortNewsByDate = (news: NewsItem[]): NewsItem[] => {
    return [...news].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
};

export const useNews = (category: 'companies' | 'dev' = 'companies') => {
    const { language } = useLanguage();
    const [companyNews, setCompanyNews] = useState<CompanyNews[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                let data: NewsData;
                if (category === 'dev') {
                    if (language === 'jp') {
                        const response = await import('../data/news_dev_jp.json');
                        data = response.default as NewsData;
                    } else {
                        const response = await import('../data/news_dev_en.json');
                        data = response.default as NewsData;
                    }
                } else {
                    if (language === 'jp') {
                        const response = await import('../data/news_jp.json');
                        data = response.default as NewsData;
                    } else {
                        const response = await import('../data/news_en.json');
                        data = response.default as NewsData;
                    }
                }

                const newsWithState: CompanyNews[] = data.companies.map((c) => ({
                    company: c.company,
                    displayName: c.displayName,
                    news: sortNewsByDate(c.news),
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
    }, [language, category]);

    return { companyNews, loading };
};

export const useTopNews = (companyNews: CompanyNews[]): NewsItem[] => {
    // 各社の最新ニュースを1つずつ取得
    const topNewsPerCompany = companyNews
        .map((cn) => cn.news[0]) // 各社の先頭（最新）ニュースを取得
        .filter((n) => n && n.pubDate); // 存在するニュースのみフィルタ

    return topNewsPerCompany;
};

export const isNewArticle = (pubDate: string): boolean => {
    const articleDate = new Date(pubDate).getTime();
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - articleDate < twentyFourHours;
};
