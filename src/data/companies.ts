import type { Company } from '../types';

// AI企業（メインタブ）
export const companies: Company[] = [
    { key: 'google', displayName: 'Google', searchTerm: ['Google AI', 'Gemini', 'NotebookLM'] },
    { key: 'openai', displayName: 'OpenAI', searchTerm: ['OpenAI', 'ChatGPT'] },
    { key: 'microsoft', displayName: 'Microsoft', searchTerm: ['Microsoft AI', 'Copilot AI'] },
    { key: 'anthropic', displayName: 'Anthropic', searchTerm: ['Anthropic', 'Claude'] },
    { key: 'amazon', displayName: 'Amazon', searchTerm: ['Amazon AI', 'AWS Bedrock'] },
    { key: 'meta', displayName: 'Meta', searchTerm: ['Meta AI'] },
    { key: 'xai', displayName: 'xAI', searchTerm: ['Grok', 'xAI'] },
];

// エンジニア向けツール（Devタブ）
export const devTools: Company[] = [
    { key: 'cursor', displayName: 'Cursor', searchTerm: ['Cursor', 'Anysphere'] },
    { key: 'github-copilot', displayName: 'GitHub Copilot', searchTerm: ['GitHub Copilot', 'GitHub AI'] },
    { key: 'vscode', displayName: 'Visual Studio Code', searchTerm: ['Visual Studio Code', 'VS Code'] },
    { key: 'kiro', displayName: 'AWS Kiro', searchTerm: ['AWS Kiro'] },
    { key: 'antigravity', displayName: 'Antigravity', searchTerm: ['Antigravity'] },
];
