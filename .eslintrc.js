module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'react/hook-use-state': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off',
    'no-shadow': 'off',
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        endOfLine: 'auto',
        semi: true,
      },
    ],
    'no-unused-vars': 'error',
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error', 'debug'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
