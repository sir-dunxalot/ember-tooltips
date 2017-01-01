module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  rules: {
    'block-spacing': 'error',
    'capitalized-comments': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'ember-suave/no-const-outside-module-scope': 'off',
    'eol-last': ['error', 'always'],
    'line-comment-position': ['error', { 'position': 'beside' }],
    'lines-around-comment': ['error', { 'afterBlockComment': true }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-trailing-spaces': 'error',
  }
};
