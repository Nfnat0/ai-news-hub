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

export interface CompanyLink {
    name: string;
    url: string;
    description: string;
    logo: string;
}
