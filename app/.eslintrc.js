const path = require('path');

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  globals: {
    document: 'readonly',
    localStorage: 'readonly',
    window: 'readonly',
    alert: 'readonly',
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:react-hooks/recommended'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': [0],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'no-async-promise-executor': [0],
    'react/static-property-placement': [0],
    'padding-line-between-statements': [
      2,
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'multiline-let',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'multiline-var',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'switch',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'case',
      },
      {
        blankLine: 'any',
        prev: 'case',
        next: 'case',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'default',
      },
      {
        blankLine: 'any',
        prev: 'case',
        next: 'default',
      },
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
      },
    ],
    'no-bitwise': [
      0,
      {
        allow: ['~'],
        int32Hint: true,
      },
    ],
    'react/jsx-closing-bracket-location': [
      2,
      {
        nonEmpty: 'after-props',
        selfClosing: 'after-props',
      },
    ],
    'react/jsx-filename-extension': [0],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    'jsx-a11y/label-has-for': [0],
    'react/jsx-fragments': [0],
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'react/require-default-props': [0],
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: path.join(__dirname, 'webpack.config.js'),
      },
    },
    react: {
      pragma: 'React',
      version: '17.0.0',
    },
  },
};
