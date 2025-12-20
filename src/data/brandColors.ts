export const brandColors: Record<string, { primary: string; gradient?: string; glow: string }> = {
    google: {
        primary: '#4285F4',
        gradient: 'bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500',
        glow: 'shadow-blue-500/50',
    },
    openai: {
        primary: '#10A37F',
        glow: 'shadow-emerald-500/50',
    },
    microsoft: {
        primary: '#00A4EF',
        glow: 'shadow-sky-500/50',
    },
    anthropic: {
        primary: '#D4A574',
        glow: 'shadow-amber-600/50',
    },
    amazon: {
        primary: '#FF9900',
        glow: 'shadow-orange-500/50',
    },
    xai: {
        primary: '#E8E8E8',
        glow: 'shadow-gray-300/50',
    },
    anysphere: {
        primary: '#7C3AED',
        glow: 'shadow-violet-500/50',
    },
};

export const getBrandStyle = (companyKey: string) => {
    const colors = brandColors[companyKey];
    if (!colors) return { color: '#ffffff' };
    return { color: colors.primary };
};
