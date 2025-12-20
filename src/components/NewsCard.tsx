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

    // 確実に動物画像を表示するAPI（犬猫の割合を高く）
    // PlaceKitten: https://placekitten.com/{width}/{height}
    // PlaceDog: https://placedog.net/{width}/{height}?id={number}
    const getAnimalImage = (idx: number) => {
        const isCat = idx % 2 === 0; // 偶数は猫、奇数は犬
        if (isCat) {
            // PlaceKittenは同じサイズでも異なる画像を返す
            const width = 400 + (idx % 5) * 10;
            const height = 225 + (idx % 3) * 5;
            return `https://placekitten.com/${width}/${height}`;
        } else {
            // PlaceDogはidで異なる画像を指定
            return `https://placedog.net/400/225?id=${idx}`;
        }
    };

    const fallbackImage = getAnimalImage(index);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return '1時間以内';
        if (diffHours < 24) return `${diffHours}時間前`;
        if (diffDays < 7) return `${diffDays}日前`;
        return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
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
