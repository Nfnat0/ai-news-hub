import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NewsItem } from '../types';
import { formatDate } from '../types';
import { isNewArticle } from '../hooks/useNews';

interface HeroSectionProps {
    topNews: NewsItem[];
    loading: boolean;
}

const AUTO_SLIDE_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

// タイトルを4行に制限し、超過分は...で省略
const truncateTitle = (title: string, maxChars: number = 120): string => {
    if (title.length <= maxChars) return title;
    return title.slice(0, maxChars).trim() + '...';
};

export const HeroSection = ({ topNews, loading }: HeroSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    // PlaceDogで犬の画像URLを生成（topNewsが変わるまで固定）
    const dogImages = useMemo(() => {
        return topNews.map((_, idx) => {
            const randomSeed = Math.floor(Math.random() * 1000);
            return `https://placedog.net/960/540?random&id=${idx}-${randomSeed}`;
        });
    }, [topNews]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? topNews.length - 1 : prev - 1));
    }, [topNews.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === topNews.length - 1 ? 0 : prev + 1));
    }, [topNews.length]);

    // スワイプ操作のハンドラー
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        touchStartX.current = null;
    }, [handleNext, handlePrev]);

    useEffect(() => {
        if (topNews.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === topNews.length - 1 ? 0 : prev + 1));
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [topNews.length, isPaused]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [topNews]);

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

    const isNew = isNewArticle(currentNews.pubDate);

    return (
        <div
            className="relative h-[75vh] overflow-hidden bg-[#141414] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Image with smooth transition */}
            <div className="absolute inset-0">
                {topNews.map((news, index) => (
                    <img
                        key={index}
                        src={dogImages[index]}
                        alt={news.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}

                {/* Clickable overlay link */}
                <a
                    href={currentNews.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label="Read article"
                />
            </div>

            {/* Gradient overlays for seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/95 via-transparent to-transparent" />

            {/* Navigation Buttons - Desktop only, from header bottom to before gradient */}
            <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-0 top-[10%] bottom-[10%] w-14 z-20 bg-gradient-to-b from-transparent via-black/10 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Previous slide"
            >
                <ChevronLeft size={36} className="text-white" />
            </button>
            <button
                onClick={handleNext}
                className="hidden md:flex absolute right-0  top-[10%] bottom-[10%] w-14 z-20 bg-gradient-to-b from-transparent via-black/10 to-transparent items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Next slide"
            >
                <ChevronRight size={36} className="text-white" />
            </button>

            {/* Slide Indicators - Bottom Right */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
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
            <div className="absolute bottom-0 left-16 right-16 pb-12">
                <div className="max-w-3xl">
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
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg line-clamp-4">
                        {truncateTitle(currentNews.title)}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-300/80 mb-6">
                        <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {formatDate(currentNews.pubDate)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
