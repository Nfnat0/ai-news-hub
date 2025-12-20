import { useState, useCallback, useEffect } from 'react';
import { ExternalLink, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NewsItem } from '../types';
import { isNewArticle } from '../hooks/useNews';

interface HeroSectionProps {
    topNews: NewsItem[];
    loading: boolean;
}

const AUTO_SLIDE_INTERVAL = 5000;

export const HeroSection = ({ topNews, loading }: HeroSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
    const [isPaused, setIsPaused] = useState(false);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? topNews.length - 1 : prev - 1));
    }, [topNews.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === topNews.length - 1 ? 0 : prev + 1));
    }, [topNews.length]);

    useEffect(() => {
        if (topNews.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === topNews.length - 1 ? 0 : prev + 1));
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [topNews.length, isPaused]);

    useEffect(() => {
        setCurrentIndex(0);
        setImgErrors({});
    }, [topNews]);

    const handleImageError = (index: number) => {
        setImgErrors((prev) => ({ ...prev, [index]: true }));
    };

    if (loading) {
        return (
            <div className="relative h-[75vh] bg-[#141414]">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50 animate-pulse" />
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent">
                    <div className="max-w-3xl">
                        <div className="h-8 bg-gray-700/50 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (topNews.length === 0) {
        return (
            <div className="relative h-[75vh] bg-[#141414] flex items-center justify-center">
                <p className="text-gray-500 text-xl">Loading news...</p>
            </div>
        );
    }

    const currentNews = topNews[currentIndex];

    // 犬の画像を高解像度で取得（静的URL）
    const staticDogImages = [
        'https://images.dog.ceo/breeds/shiba/shiba-8.jpg',
        'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg',
        'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
        'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_10475.jpg',
        'https://images.dog.ceo/breeds/samoyed/n02111889_10206.jpg',
    ];

    const isNew = isNewArticle(currentNews.pubDate);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div
            className="relative h-[75vh] overflow-hidden bg-[#141414] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image with smooth transition */}
            <div className="absolute inset-0">
                {topNews.map((news, index) => {
                    const heroFallback = staticDogImages[index % staticDogImages.length];

                    return (
                        <img
                            key={index}
                            src={imgErrors[index] ? heroFallback : news.thumbnail || heroFallback}
                            alt={news.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 brightness-50 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            onError={() => handleImageError(index)}
                        />
                    );
                })}
            </div>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Gradient overlays for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 via-transparent to-transparent" />

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10"
                aria-label="Previous slide"
            >
                <ChevronLeft size={28} className="text-white" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/10"
                aria-label="Next slide"
            >
                <ChevronRight size={28} className="text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {topNews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-4'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-4">
                        {isNew && (
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <span className="text-blue-200 text-xs font-bold tracking-wider uppercase drop-shadow-md bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                                    New
                                </span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                        {currentNews.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-300/80 mb-6">
                        <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {formatDate(currentNews.pubDate)}
                        </span>
                    </div>
                    <a
                        href={currentNews.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Read Article
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};
