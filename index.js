"use strict";

module.exports = {
  name: require("./package").name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import("node_modules/popper.js/dist/umd/popper.js", {
      using: [
        {
          transformation: "amd",
          as: "popper.js"
        }
      ]
    });
    app.import("node_modules/tooltip.js/dist/umd/tooltip.js", {
      using: [
        {
          transformation: "amd",
          as: "tooltip.js"
        }
      ]
    });
  },

  treeForAddonTestSupport(tree) {
    const writeFile = require('broccoli-file-creator');
    const optionalFeatures = this.addons.find(a => a.name === '@ember/optional-features');
    const testType = optionalFeatures.isFeatureEnabled('jquery-integration')
      ? 'jquery'
      : 'dom';

    const reexportTree = writeFile(
      'index.js',
      `export * from '${this.moduleName()}/test-support/${testType}';`
    );

    const MergedTrees = require('broccoli-merge-trees');
    const mergedTree = new MergedTrees([tree, reexportTree]);

    return this._super(mergedTree);
  }
};
