import type { Company } from '../types';

// AI企業（メインタブ）
export const companies: Company[] = [
    { key: 'google', displayName: 'Google', searchTerm: ['Google AI', 'Gemini'] },
    { key: 'openai', displayName: 'OpenAI', searchTerm: ['OpenAI'] },
    { key: 'microsoft', displayName: 'Microsoft', searchTerm: ['Microsoft AI', 'Copilot AI'] },
    { key: 'anthropic', displayName: 'Anthropic', searchTerm: ['Anthropic'] },
    { key: 'amazon', displayName: 'Amazon', searchTerm: ['Amazon AI', 'AWS Bedrock'] },
    { key: 'xai', displayName: 'xAI', searchTerm: ['Grok', 'xAI'] },
];

// エンジニア向けツール（Devタブ）
export const devTools: Company[] = [
    { key: 'cursor', displayName: 'Cursor', searchTerm: ['Cursor'] },
    { key: 'github-copilot', displayName: 'GitHub Copilot', searchTerm: ['GitHub Copilot'] },
    { key: 'vscode', displayName: 'Visual Studio Code', searchTerm: ['Visual Studio Code'] },
    { key: 'kiro', displayName: 'AWS Kiro', searchTerm: ['AWS Kiro'] },
    { key: 'antigravity', displayName: 'Antigravity', searchTerm: ['Antigravity AI'] },
];
