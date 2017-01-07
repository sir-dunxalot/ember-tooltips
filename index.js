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
