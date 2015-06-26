import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | tooltip on helper', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Rendering tooltips set on helpers', function(assert) {
  let component;

  visit('/tooltip-on-helper');

  assertTooltipProperties('on-inline-component');

});
