export interface NewsItem {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    thumbnail?: string;
}

export interface CompanyNews {
    company: string;
    displayName: string;
    news: NewsItem[];
    loading: boolean;
    error: string | null;
}

export interface Company {
    key: string;
    displayName: string;
    searchTerm: string[];
}

// 日付フォーマット用ユーティリティ
export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// フォールバック画像URL生成
export const getFallbackImageUrl = (seed: string, index: number): string => {
    const safeSeed = `${seed}-${index}`.replace(/\s/g, '-');
    return `https://picsum.photos/seed/${safeSeed}/400/225`;
};
