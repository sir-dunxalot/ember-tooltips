import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance | tooltip triggered manually', {

  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },

});

test('Rendering tooltips with event="manual" and provided "tooltipVisibility" boolean', function(assert) {
  visit('/tooltip-manual-trigger');

  assert.expect(13);

  assertTooltipProperties(assert, 'manually-trigger', {
    content: 'This is a manually triggered tooltip',
    event: 'manual',
  });

  assertTooltipProperties(assert, 'manually-trigger-component', {
    targetContent: 'Manual tooltip as component',
    content: 'Manually triggering a component tooltip',
    usingComponent: true,
    event: 'manual',
  });

});
