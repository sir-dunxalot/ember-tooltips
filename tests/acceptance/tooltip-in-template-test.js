import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | tooltip in template', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Rendering tooltips set on child DOM elements', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(true);
  });
});
