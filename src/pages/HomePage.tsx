import { HeroSection } from '../components/HeroSection';
import { NewsRow } from '../components/NewsRow';
import { useNews, useTopNews } from '../hooks/useNews';

export const HomePage = () => {
    const { companyNews, loading } = useNews();
    const topNews = useTopNews(companyNews);

    return (
        <main className="min-h-screen bg-[#141414]">
            <HeroSection topNews={topNews} loading={loading} />
            <div className="pb-16 -mt-8 relative z-10">
                {companyNews.map((cn) => (
                    <NewsRow key={cn.company} companyNews={cn} />
                ))}
            </div>
        </main>
    );
};
