'use strict';

module.exports = {
  extends: 'octane',

  rules: {
    'no-curly-component-invocation': {
      allow: [
        'maybe-in-element',
      ]
    }
  }
};
