import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | tooltip on element', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Rendering tooltips set on child DOM elements', function(assert) {

  assert.expect(6);

  visit('/tooltip-on-element');

  assertTooltipProperties(assert, 'on-element', {
    content: 'This is set on a data attribute',
  });

});
