'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    includeHighlightJS: false,
    includeHighlightStyle: false,
    snippetSearchPaths: ['app', 'tests'],

    minifyCSS: {
      enabled: false // CSS minification w/ @import rules seems to be broken in Ember-CLI 3.3
    }
  });

  /*
    As recommended by ember-cli-snippet this is a customised download from
    https://highlightjs.org/download/
    with CSS, Javscript, HTML/XML, Handlebars
  */

  app.import('vendor/highlight.pack.js', {
    using: [{
      transformation: 'amd',
      as: 'highlight.js'
    }]
  });

  return app.toTree();
};
