import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { CompanyNews } from '../types';
import { NewsCard } from './NewsCard';
import { getBrandStyle, brandColors } from '../data/brandColors';

interface NewsRowProps {
    companyNews: CompanyNews;
}

export const NewsRow = ({ companyNews }: NewsRowProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const brandStyle = getBrandStyle(companyNews.company);
    const colors = brandColors[companyNews.company];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 640;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (companyNews.error) {
        return (
            <section className="py-6">
                <h2 className="text-xl font-bold text-white mb-4 px-8">
                    {companyNews.displayName}
                </h2>
                <div className="px-8 text-red-400/80">
                    Failed to load news: {companyNews.error}
                </div>
            </section>
        );
    }

    const sortedNews = [...companyNews.news].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return (
        <section className="py-4 group/row">
            <div className="px-8 mb-3 flex items-center">
                <h2
                    className="text-3xl font-black tracking-tight drop-shadow-lg"
                    style={{
                        ...brandStyle,
                        textShadow: `0 0 30px ${colors?.primary || '#ffffff'}40`,
                    }}
                >
                    {companyNews.displayName}
                </h2>
            </div>
            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} className="text-white" />
                </button>
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-8 pb-6 pt-2"
                >
                    {companyNews.loading ? (
                        <div className="flex items-center justify-center w-full h-48">
                            <Loader2 className="animate-spin text-gray-500" size={32} />
                        </div>
                    ) : sortedNews.length === 0 ? (
                        <div className="text-gray-500 py-8 font-medium">No news found</div>
                    ) : (
                        sortedNews.map((news, index) => (
                            <NewsCard
                                key={`${companyNews.company}-${index}`}
                                news={news}
                                index={index}
                                brandColor={colors?.primary || '#ffffff'}
                            />
                        ))
                    )}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} className="text-white" />
                </button>
            </div>
        </section>
    );
};
