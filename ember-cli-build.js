'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    includeHighlightJS: false,
    includeHighlightStyle: false,
    snippetSearchPaths: ['app', 'tests'],

    autoImport: {
      exclude: ['highlight.js'],
      forbidEval: true,
      webpack: {
        // Webpack won't auto-detect, because of "maintained node versions" in config/targets.js
        target: 'web',
      },
    },

    sourcemaps: {
      enabled: true,
    },
  });

  /*
    As recommended by ember-cli-snippet this is a customised download from
    https://highlightjs.org/download/
    with CSS, Javscript, HTML/XML, Handlebars
  */

  app.import('vendor/highlight.pack.js', {
    using: [
      {
        transformation: 'amd',
        as: 'highlight.js',
      },
    ],
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
