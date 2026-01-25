import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Common configuration shared between test and source files
const commonConfig = {
  languageOptions: {
    ecmaVersion: 2020,
    parser: tseslint.parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    import: importPlugin,
    'unused-imports': unusedImports,
    prettier: prettier,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/default': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '.eslintrc.cjs'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  // Configuration for test files with Jest and Node globals
  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/mocks/**/*.js',
    ],
    ...commonConfig,
    languageOptions: {
      ...commonConfig.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      ...commonConfig.rules,
      'react-refresh/only-export-components': 'off',
    },
  },
  // Configuration for regular source files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/__tests__/**', '**/*.test.*', '**/*.spec.*', '**/mocks/**'],
    ...commonConfig,
    languageOptions: {
      ...commonConfig.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    rules: {
      ...commonConfig.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
