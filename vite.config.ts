import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages用: リポジトリ名に合わせて変更してください
  // 例: リポジトリが https://github.com/username/ai-news-hub なら '/ai-news-hub/'
  base: process.env.GITHUB_ACTIONS ? '/ai-news-hub/' : '/',
})
