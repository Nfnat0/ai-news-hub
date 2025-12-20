import type { CompanyLink } from '../types';

export const companies = [
    { key: 'google', displayName: 'Google', searchTerm: ['Google AI', 'Gemini'] },
    { key: 'openai', displayName: 'OpenAI', searchTerm: ['OpenAI'] },
    { key: 'microsoft', displayName: 'Microsoft', searchTerm: ['GitHub Copilot', "Copilot AI"] },
    { key: 'anthropic', displayName: 'Anthropic', searchTerm: ['Anthropic'] },
    { key: 'amazon', displayName: 'Amazon', searchTerm: ['Kiro', 'Bedrock'] },
    { key: 'xai', displayName: 'xAI', searchTerm: ['Grok'] },
    { key: 'anysphere', displayName: 'Anysphere', searchTerm: ['Cursor'] },
];

export const companyLinks: CompanyLink[] = [
    {
        name: 'OpenAI',
        url: 'https://openai.com',
        description: 'AI research company behind ChatGPT, GPT-5.2, and Sora2',
        logo: '🤖',
    },
    {
        name: 'Anthropic',
        url: 'https://anthropic.com',
        description: 'AI safety company developing Claude AI assistant',
        logo: '🧠',
    },
    {
        name: 'Google',
        url: 'https://ai.google',
        description: "Google's AI division developing Gemini and other AI products",
        logo: '🔍',
    },
    {
        name: 'Microsoft',
        url: 'https://www.microsoft.com/ai',
        description: 'Microsoft AI division offering Copilot and Azure AI services',
        logo: '💻',
    },
    {
        name: 'Amazon',
        url: 'https://aws.amazon.com/bedrock',
        description: 'Amazon Web Services AI platform with Bedrock and Kiro',
        logo: '📦',
    },
    {
        name: 'xAI',
        url: 'https://x.ai',
        description: "Elon Musk's AI company developing Grok",
        logo: '🚀',
    },
    {
        name: 'Anysphere',
        url: 'https://anysphere.inc',
        description: 'Company behind Cursor, the AI-powered code editor',
        logo: '⌨️',
    },
];
