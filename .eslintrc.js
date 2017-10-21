module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended',
  ],
  plugins: [
    'netguru-ember', // Import rules but don't automatically add the config
  ],
  rules: {
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true,
    }],
    'capitalized-comments': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'func-style': ['error', 'declaration', {
      'allowArrowFunctions': true,
    }],
    'line-comment-position': ['error', {
      'position': 'beside',
    }],
    'lines-around-comment': ['error', {
      'afterBlockComment': true,
      'beforeBlockComment': true,
    }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-trailing-spaces': 'error',
    'object-property-newline': 'error',
    'one-var': ['error', 'never'],
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true,
    }],
    'space-before-blocks': 'error',

    /* ember-suave custom rules

    https://github.com/DockYard/eslint-plugin-ember-suave/tree/master/docs/rules
    */

    'ember-suave/no-const-outside-module-scope': 'off',

    /* netguru-ember rules

    https://github.com/netguru/eslint-plugin-netguru-ember
    */

    'netguru-ember/jquery-ember-run': 1,
    'netguru-ember/no-function-prototype-extensions': 1,
    'netguru-ember/order-in-components': 1,
    'netguru-ember/no-on-calls-in-components': 1,
  }
};
