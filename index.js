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

  included: function(app) {
    this._super.included(app); // For ember-cli-sass

    app.import('vendor/popper/popper.js');
    app.import('vendor/popper/tooltip.js');
  },

};
