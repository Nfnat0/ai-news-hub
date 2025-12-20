import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { NewsItem } from '../types';
import { isNewArticle } from '../hooks/useNews';

interface NewsCardProps {
    news: NewsItem;
    index: number;
    brandColor?: string;
}

export const NewsCard = ({ news, index, brandColor = '#ffffff' }: NewsCardProps) => {
    const [imgError, setImgError] = useState(false);
    const isNew = isNewArticle(news.pubDate);

    // かわいい動物の画像をランダムに表示（犬猫の割合を高く）
    const animals = [
        'dog', 'cat', 'puppy', 'kitten', 'dog', 'cat', 'puppy', 'kitten',
        'dog', 'cat', 'puppy', 'kitten',
        'rabbit', 'bunny', 'hamster', 'hedgehog', 'fox', 'panda', 'koala',
        'otter', 'penguin', 'seal', 'red-panda'
    ];
    const animalIndex = index % animals.length;
    const animal = animals[animalIndex];
    const fallbackImage = `https://picsum.photos/seed/cute-${animal}-card-${index}/800/450`;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Less than 1 hour ago';
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US');
    };

    return (
        <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[286px] hover:w-[372px] bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ease-out hover:z-20 hover:shadow-2xl border border-white/5 hover:border-white/20"
            style={{ '--brand-color': brandColor } as React.CSSProperties}
        >
            <div className="relative h-28 overflow-hidden">
                <img
                    src={imgError ? fallbackImage : news.thumbnail || fallbackImage}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setImgError(true)}
                    data-testid="news-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

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

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className="bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 hover:bg-black/80">
                        <ExternalLink size={12} className="text-white" />
                    </div>
                </div>
            </div>
            <div className="p-3 h-36 flex flex-col justify-between">
                <h3 className="text-gray-100 font-bold text-base line-clamp-4 leading-snug transition-colors duration-300 group-hover:text-[var(--brand-color)]">
                    {news.title}
                </h3>
                <p className="text-gray-500 text-xs font-medium">{formatDate(news.pubDate)}</p>
            </div>
        </a>
    );
};
