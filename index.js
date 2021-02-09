'use strict';

const funnel = require('broccoli-funnel');
const stringReplace = require('broccoli-string-replace');
const MergedTrees = require('broccoli-merge-trees');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;
const path = require('path');

module.exports = {
  name: require('./package').name,

  findModulePath(basedir, moduleName) {
    try {
      const resolve = require('resolve'); // eslint-disable-line node/no-extraneous-require
      return path.dirname(resolve.sync(moduleName, { basedir: basedir }));
    } catch (_) {
      try {
        return path.dirname(require.resolve(moduleName));
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          this.ui.writeLine(
            `ember-tooltips: ${moduleName} not installed, be sure you have ${moduleName} installed via npm/yarn.`
          );
          return;
        }

        throw e;
      }
    }
  },

  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/ember-tooltips--popper.js', {
      using: [
        {
          transformation: 'amd',
          as: 'popper.js',
        },
      ],
    });
    app.import('vendor/ember-tooltips--tooltip.js', {
      using: [
        {
          transformation: 'amd',
          as: 'tooltip.js',
        },
      ],
    });
  },

  removeSourcemapAnnotation(node) {
    return stringReplace(node, {
      files: ['popper.js', 'tooltip.js'],
      annotation: 'Remove sourcemap annotation (popper.js & tooltip.js)',
      patterns: [
        {
          match: /\/\/# sourceMappingURL=popper.js.map/g,
          replacement: '',
        },
        {
          match: /\/\/# sourceMappingURL=tooltip.js.map/g,
          replacement: '',
        },
      ],
    });
  },

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

  treeForVendor(tree) {
    let popperPath = this.findModulePath(this.project.root, 'popper.js');
    let popperTree = funnel(new UnwatchedDir(popperPath), {
      include: ['popper.js'],
    });

    let tooltipPath = this.findModulePath(this.project.root, 'tooltip.js');
    let tooltipTree = funnel(new UnwatchedDir(tooltipPath), {
      include: ['tooltip.js'],
    });

    const mergedTree = new MergedTrees([tree, popperTree, tooltipTree]);

    return funnel(this.removeSourcemapAnnotation(mergedTree), {
      getDestinationPath(relativePath) {
        if (relativePath === 'popper.js' || relativePath === 'tooltip.js') {
          return `ember-tooltips--${relativePath}`;
        }

        return relativePath;
      },
    });
  },
};
