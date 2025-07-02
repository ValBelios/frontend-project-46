import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@stylistic': require('@stylistic/eslint-plugin')
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      'no-console': 'off'
    },
    ignores: ['dist', 'node_modules'],
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  }
])