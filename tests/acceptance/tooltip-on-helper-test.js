import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-tooltips/tests/helpers/start-app';

var application;

module('Acceptance | tooltip on helper', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /tooltip-on-helper', function(assert) {
  visit('/tooltip-on-helper');

  andThen(function() {
    assert.equal(currentURL(), '/tooltip-on-helper');
  });
});
