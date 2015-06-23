import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-tooltips/tests/helpers/start-app';

var application;

module('Acceptance | tooltip in template', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /tooltip-in-template', function(assert) {
  visit('/tooltip-in-template');

  andThen(function() {
    assert.equal(currentURL(), '/tooltip-in-template');
  });
});
