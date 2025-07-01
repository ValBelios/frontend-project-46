import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // вместо browser
      },
    },
    plugins: {},
    rules: {
      // ваши собственные правила (если нужно)
      'no-console': 'off', // например, можно отключить предупреждения о console.log
    },
    ignores: ['dist', 'node_modules'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]);

