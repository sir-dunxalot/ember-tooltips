import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import selectorFor from '../helpers/selector-for';

let application;

module('Acceptance | tooltip with safestring', {

  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },

});

test('Rendering safestring works', function(assert) {

  visit('/tooltip-with-safestring');

  assertTooltipProperties(assert, 'on-inline-component', {
    content: 'this is a test',
  });

});

test('Binding to property that returns different safestrings works', function(assert) {

  visit('/tooltip-with-safestring');

  assert.expect(12);

  assertTooltipProperties(assert, 'toggle-safestrings', {
    content: 'SafeString 1',
  });

  // Clicking button will toggle the text
  click(selectorFor('button'));

  andThen(function() {
    assertTooltipProperties(assert, 'toggle-safestrings', {
      content: 'SafeString 2',
    });
  });

});
