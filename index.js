/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tooltips',

  options: {
    nodeAssets: {

      'popper.js': {
        vendor: {
          srcDir: 'dist/umd',
          destDir: 'popper',
          include: ['popper.js'],
        },
      },

      'tooltip.js': {
        vendor: {
          srcDir: 'dist/umd',
          destDir: 'popper',
          include: ['tooltip.js'],
        },
      },
    },
  },

  config: function(env, baseConfig) {
    var rootElement = baseConfig.APP.rootElement;
    var config = {};

    if (rootElement) {

      /*
      This config overrides tether's bodyElement option.

      https://github.com/HubSpot/tether/blob/4de1f5cb421e0e6149269a347ee261b06bdbd139/src/js/tether.js#L762
      */

      config['ember-tether'] = {
        bodyElementId: rootElement.replace('#', ''),
      };
    }

    return config;
  },

  included: function(app) {
    this._super.included(app); // For ember-cli-sass

    app.import('vendor/popper/popper.js');
    app.import('vendor/popper/tooltip.js');
  },

};
