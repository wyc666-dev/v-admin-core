/**
 * ESLint 平铺配置文件。
 *
 * 这里统一声明整个前端项目的代码检查规则，核心目的有两个：
 * 1. 在开发阶段尽早发现语法问题、未使用变量和不安全写法。
 * 2. 让 React / TypeScript 代码保持一致的约束标准。
 */
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  // 构建产物目录不参与 lint，避免把编译结果当成源码检查。
  globalIgnores(['dist']),
  {
    // 当前规则只针对 TypeScript 源码文件生效。
    files: ['**/*.{ts,tsx}'],
    extends: [
      // JavaScript 基础推荐规则。
      js.configs.recommended,
      // TypeScript 官方推荐规则。
      tseslint.configs.recommended,
      // React Hooks 使用规范，例如依赖数组完整性。
      reactHooks.configs.flat.recommended,
      // 约束 React Fast Refresh 相关写法，避免热更新失效。
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // 设定语言版本，确保 ESLint 能识别现代语法。
      ecmaVersion: 2020,
      // 注入浏览器全局变量，避免 `window`、`document` 被误报。
      globals: globals.browser,
    },
    rules: {
      // React 17+ 使用新 JSX 转换，不需要显式引入 React。
      'react/react-in-jsx-scope': 'off',
      // 项目主要依赖 TypeScript 做类型约束，不再额外要求 prop-types。
      'react/prop-types': 'off',
      // 下划线前缀参数或变量被视为“刻意保留”，不再提示未使用。
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // 交给 TypeScript 版本的规则处理，关闭 JS 原生重复规则。
      'no-unused-vars': 'off',
      // Hook 依赖问题先给 warning，方便渐进修正。
      'react-hooks/exhaustive-deps': 'warn',
      // 默认不鼓励输出日志，只放行 warn / error。
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // any 先保留 warning 级别，避免一次性重构成本过高。
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
])
