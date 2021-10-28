'use strict';

const MergedTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  treeForAddonTestSupport(tree) {
    const writeFile = require('broccoli-file-creator');
    const optionalFeatures = this.project.findAddonByName(
      '@ember/optional-features'
    );
    const testType =
      optionalFeatures &&
      !optionalFeatures.isFeatureEnabled('jquery-integration')
        ? 'dom'
        : 'jquery';

    const reexportTree = writeFile(
      'index.js',
      `export * from '${this.moduleName()}/test-support/${testType}';`
    );

    const mergedTree = new MergedTrees([tree, reexportTree]);

    return this._super(mergedTree);
  },
};
