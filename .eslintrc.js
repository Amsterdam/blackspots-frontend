// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam
// eslint is loaded with react-scripts
module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  globals: {
    L: true,
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      rules: {},
    },
    {
      // extends: ['plugin:@typescript-eslint/recommended'],
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        // '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  root: true,
  rules: {
    'no-console': 'error',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
