import { useSearchParams } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { NewsRow } from '../components/NewsRow';
import { useNews, useTopNews } from '../hooks/useNews';

export const HomePage = () => {
    const [searchParams] = useSearchParams();
    const activeTab = (searchParams.get('tab') || 'companies') as 'companies' | 'dev';

    const { companyNews, loading } = useNews(activeTab);
    const topNews = useTopNews(companyNews);

    return (
        <main className="min-h-screen bg-[#141414]">
            <HeroSection topNews={topNews} loading={loading} />

            {/* News Content */}
            <div className="pb-16 -mt-8 relative z-10">
                {companyNews.length === 0 && !loading ? (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        No news available
                    </div>
                ) : (
                    companyNews.map((cn) => (
                        <NewsRow key={cn.company} companyNews={cn} />
                    ))
                )}
            </div>
        </main>
    );
};
