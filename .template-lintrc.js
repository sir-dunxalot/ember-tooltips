'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'no-curly-component-invocation': {
      allow: ['maybe-in-element'],
    },
    'no-forbidden-elements': 'off', // CSS example
    'no-yield-only': 'off', // Needed for 2.x support?
  },
};
