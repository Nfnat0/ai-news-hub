import { useState } from 'react';
import { Play } from 'lucide-react';
import type { NewsItem } from '../types';
import { formatDate, getFallbackImageUrl } from '../types';
import { isNewArticle } from '../hooks/useNews';

interface NewsCardProps {
    news: NewsItem;
    index: number;
    brandColor?: string;
}

export const NewsCard = ({ news, index, brandColor = '#ffffff' }: NewsCardProps) => {
    const [imgError, setImgError] = useState(false);
    const isNew = isNewArticle(news.pubDate);

    const fallbackImage = getFallbackImageUrl('card', index);

    return (
        <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[316px] hover:w-[400px] hover:-mx-2 bg-gray-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-out hover:z-20 hover:shadow-2xl border border-transparent rounded-xl"
            style={{ '--brand-color': brandColor } as React.CSSProperties}
        >
            <div className="relative h-40 overflow-hidden">
                <img
                    src={imgError ? fallbackImage : news.thumbnail || fallbackImage}
                    alt={news.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                    onError={() => setImgError(true)}
                    data-testid="news-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />

                {/* NEW Badge */}
                {isNew && (
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-200 text-[9px] font-bold tracking-wider uppercase drop-shadow-md bg-black/40 px-1 py-0.5 rounded-full backdrop-blur-sm">
                            New
                        </span>
                    </div>
                )}

                {/* Play Button - Center on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div
                        className="p-4 rounded-full backdrop-blur-md border-2 transition-transform duration-300 group-hover:scale-110"
                        style={{
                            backgroundColor: `${brandColor}20`,
                            borderColor: brandColor,
                        }}
                    >
                        <Play
                            size={32}
                            className="drop-shadow-lg"
                            style={{ color: brandColor }}
                            fill={brandColor}
                        />
                    </div>
                </div>
            </div>
            <div className="p-3 h-34 flex flex-col justify-between">
                <h3 className="text-gray-100 font-bold text-lg line-clamp-4 leading-snug transition-colors duration-300 group-hover:text-[var(--brand-color)]">
                    {news.title}
                </h3>
                <p className="text-gray-500 text-xs font-medium">{formatDate(news.pubDate)}</p>
            </div>
        </a>
    );
};
