'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included(app);

    app.import(`${this.project.root}/node_modules/popper.js/dist/umd/popper.js`);
    app.import(`${this.project.root}/node_modules/tooltip.js/dist/umd/tooltip.js`);
  }
};
