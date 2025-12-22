export const brandColors: Record<string, { primary: string; gradient: string; glow: string }> = {
    google: {
        primary: '#c2f442ff',
        gradient: 'linear-gradient(135deg, #c2f442ff 0%, #48e421ff 50%, #c2f442ff 100%)',
        glow: 'shadow-blue-500/50',
    },
    openai: {
        primary: '#10A37F',
        gradient: 'linear-gradient(135deg, #10A37F 0%, #1DB88E 50%, #10A37F 100%)',
        glow: 'shadow-emerald-500/50',
    },
    microsoft: {
        primary: '#00A4EF',
        gradient: 'linear-gradient(135deg, #00A4EF 0%, #0078D4 50%, #00A4EF 100%)',
        glow: 'shadow-sky-500/50',
    },
    anthropic: {
        primary: '#D4A574',
        gradient: 'linear-gradient(135deg, #D4A574 0%, #E8C4A0 50%, #D4A574 100%)',
        glow: 'shadow-amber-600/50',
    },
    amazon: {
        primary: '#FF9900',
        gradient: 'linear-gradient(135deg, #FF9900 0%, #FFAD33 50%, #FF9900 100%)',
        glow: 'shadow-orange-500/50',
    },
    meta: {
        primary: '#0081FB',
        gradient: 'linear-gradient(135deg, #0081FB 0%, #00C6FF 50%, #0081FB 100%)',
        glow: 'shadow-blue-400/50',
    },
    xai: {
        primary: '#E8E8E8',
        gradient: 'linear-gradient(135deg, #E8E8E8 0%, #FFFFFF 50%, #E8E8E8 100%)',
        glow: 'shadow-gray-300/50',
    },
    // Dev Tools - 青系を避けて見分けやすい色に
    cursor: {
        primary: '#00E5A0',
        gradient: 'linear-gradient(135deg, #00E5A0 0%, #00FFB8 50%, #00E5A0 100%)',
        glow: 'shadow-emerald-400/50',
    },
    'github-copilot': {
        primary: '#F78166',
        gradient: 'linear-gradient(135deg, #F78166 0%, #FF9580 50%, #F78166 100%)',
        glow: 'shadow-orange-400/50',
    },
    vscode: {
        primary: '#007ACC',
        gradient: 'linear-gradient(135deg, #007ACC 0%, #0098FF 50%, #007ACC 100%)',
        glow: 'shadow-blue-500/50',
    },
    kiro: {
        primary: '#FF9900',
        gradient: 'linear-gradient(135deg, #FF9900 0%, #FFAD33 50%, #FF9900 100%)',
        glow: 'shadow-orange-500/50',
    },
    antigravity: {
        primary: '#A855F7',
        gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 50%, #A855F7 100%)',
        glow: 'shadow-purple-500/50',
    },
};

export const getBrandStyle = (companyKey: string) => {
    const colors = brandColors[companyKey];
    if (!colors) return { color: '#ffffff' };
    return {
        background: colors.gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    };
};
