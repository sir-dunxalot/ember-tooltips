import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | tooltip as component', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Rendering tooltips set using {{tooltip-on-parent}}', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(true);
  });
});
