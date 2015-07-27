import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | tooltip auto close', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Auto-closing tooltips using duration parameter', function(assert) {
  visit('/tooltip-auto-close');

  assert.expect(25);

  assertTooltipProperties(assert, 'auto-close-basic', {
    content: 'This shows on a click event, then hides',
    event: 'click'
  });

  assertTooltipProperties(assert, 'auto-close-component', {
    content: 'Using a component with duration set',
    usingComponent: true,
  });

  assertTooltipProperties(assert, 'auto-close-data', {
    content: 'This is set on a data attribute',
    event: 'click'
  });

  assertTooltipProperties(assert, 'auto-close-input', {
    content: 'Auto-closing tooltip on {{input}}',
    event: 'focus'
  });

});
