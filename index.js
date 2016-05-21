/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tooltips',

  included: function(app) {

    /* Load from vendor until browserify becomes first-class
    in Ember CLI */

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/tooltip/tooltip.js');
    }
    app.import('vendor/tooltip/tooltip.css');
    app.import('vendor/tooltip/tooltip-custom.css');

  }
};
