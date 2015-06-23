import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-tooltips/tests/helpers/start-app';

var application;

module('Acceptance | tooltip as component', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /tooltip-as-component', function(assert) {
  visit('/tooltip-as-component');

  andThen(function() {
    assert.equal(currentURL(), '/tooltip-as-component');
  });
});
