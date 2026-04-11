import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 设置路径别名，确保 TypeScript 和 Vite 都能识别 @ 符号
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 使用现代 API，防止 Sass 运行时的弃用警告
        api: 'modern-compiler',
        // 如果你以后有全局变量文件（如 _variables.scss），可以在这里自动引入：
        // additionalData: `@use "@/styles/_variables.scss" as *;`
      },
    },
  },
  // 建议：如果你在 Windows 开发，有时需要强制开启 HMR 监听
  server: {
    watch: {
      usePolling: true,
    },
  },
})