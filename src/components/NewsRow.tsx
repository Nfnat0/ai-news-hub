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

    // ニュースは既にuseNewsでソート済み
    const sortedNews = companyNews.news;

    return (
        <section className="py-0 group/row">
            <div className="px-8 mb-3 flex items-center">
                <h2
                    className="text-3xl font-black tracking-tight drop-shadow-lg"
                    style={brandStyle}
                >
                    {companyNews.displayName}
                </h2>
            </div>
            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="hidden md:flex absolute left-0 top-0 bottom-0 w-12 z-30 bg-gradient-to-b from-transparent via-black/10 to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={28} className="text-white" />
                </button>
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-14 pb-6 pt-2"
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
                    className="hidden md:flex absolute right-0 top-0 bottom-0 w-12 z-30 bg-gradient-to-b from-transparent via-black/10 to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={28} className="text-white" />
                </button>
            </div>
        </section>
    );
};
