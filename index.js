/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-tooltips',

  config: function(env, baseConfig) {
    const { APP } = baseConfig;
    const { rootElement } = APP;

    let config = {};

    if (rootElement) {
      const rootElementId = rootElement.replace('#', '');

      /*
      This config overrides tether's bodyElement option.

      https://github.com/HubSpot/tether/blob/4de1f5cb421e0e6149269a347ee261b06bdbd139/src/js/tether.js#L762
      */

      config['ember-tether'] = {
        bodyElementId: rootElementId,
      };
    }

    return config;
  },

  included: function(app) {
    this._super.included(app); // For ember-cli-sass
  }

};
