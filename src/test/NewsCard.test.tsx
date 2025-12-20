import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewsCard } from '../components/NewsCard';
import type { NewsItem } from '../types';

const mockNews: NewsItem = {
    title: 'Test News Title',
    link: 'https://example.com/news',
    pubDate: new Date().toISOString(),
    description: 'Test description',
    thumbnail: 'https://placedog.net/400/225?random&id=0-123',
};

const oldNews: NewsItem = {
    title: 'Old News Title',
    link: 'https://example.com/old-news',
    pubDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago
    description: 'Old description',
    thumbnail: 'https://placedog.net/400/225?random&id=1-456',
};

describe('NewsCard', () => {
    it('renders news card with image', () => {
        render(<NewsCard news={mockNews} index={0} />);

        const image = screen.getByTestId('news-card-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockNews.thumbnail);
    });

    it('renders news title', () => {
        render(<NewsCard news={mockNews} index={0} />);

        expect(screen.getByText('Test News Title')).toBeInTheDocument();
    });

    it('has correct link to article', () => {
        render(<NewsCard news={mockNews} index={0} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com/news');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('uses fallback image when thumbnail is missing', () => {
        const newsWithoutThumbnail: NewsItem = {
            ...mockNews,
            thumbnail: undefined,
        };

        render(<NewsCard news={newsWithoutThumbnail} index={5} />);

        const image = screen.getByTestId('news-card-image');
        // 犬の画像URLパターンを確認
        expect(image.getAttribute('src')).toMatch(/^https:\/\/placedog\.net\/400\/225\?random&id=5-\d+$/);
    });

    it('switches to fallback image on error', () => {
        render(<NewsCard news={mockNews} index={3} />);

        const image = screen.getByTestId('news-card-image');
        expect(image).toHaveAttribute('src', mockNews.thumbnail);

        fireEvent.error(image);

        // 犬の画像URLパターンを確認
        expect(image.getAttribute('src')).toMatch(/^https:\/\/placedog\.net\/400\/225\?random&id=3-\d+$/);
    });

    it('shows NEW badge for recent articles (within 24 hours)', () => {
        render(<NewsCard news={mockNews} index={0} />);

        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('does not show NEW badge for old articles', () => {
        render(<NewsCard news={oldNews} index={0} />);

        expect(screen.queryByText('New')).not.toBeInTheDocument();
    });
});
