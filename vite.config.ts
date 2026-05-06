/**
 * Vite 构建配置文件。
 *
 * 这个文件控制开发服务器和生产构建阶段的公共行为，当前主要完成以下几件事：
 * 1. 注册 React 插件，让 Vite 正确处理 TSX / JSX。
 * 2. 注册 Tailwind Vite 插件，让原子类编译接入 Vite 工作流。
 * 3. 配置 `@` 路径别名，避免业务代码里频繁出现长相对路径。
 * 4. 预留 Sass 预处理器配置，便于后续引入全局变量或混入。
 * 5. 在 Windows 场景下开启轮询监听，降低热更新漏刷新的概率。
 */
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// 使用 defineConfig 只是为了获得更好的类型提示和配置校验。
export default defineConfig({
  plugins: [
    // React 官方插件：负责处理 React Fast Refresh、JSX 转换等能力。
    react(),
    // Tailwind 官方 Vite 插件：将 Tailwind 编译流程接入到当前工程。
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // 约定 `@` 指向 src 目录，业务代码中可以直接使用 `@/xxx`。
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 使用 Sass 新版 API，避免旧版调用方式带来的弃用提示。
        api: 'modern-compiler',
        // 如果后续引入全局 SCSS 变量或 mixin，可以在这里统一自动注入。
        // additionalData: `@use "@/styles/_variables.scss" as *;`
      },
    },
  },
  // 对 Windows 文件系统来说，轮询监听通常更稳定，但会多消耗一点资源。
  server: {
    watch: {
      usePolling: true,
    },
  },
})
