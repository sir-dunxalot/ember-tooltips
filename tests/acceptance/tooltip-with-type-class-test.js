import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | tooltip with type class', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  },
});

test('Tooltips can have a type class assigned', function(assert) {
  visit('/tooltip-with-type-class');

  assertTooltipProperties(assert, 'with-type-class-light', {
    content: 'This is a tooltip with a type class "light"',
    typeClass: 'light',
  });

  assertTooltipProperties(assert, 'with-type-class-success', {
    content: 'This is a tooltip with a type class "success"',
    typeClass: 'success',
  });

  assertTooltipProperties(assert, 'with-type-class-warning', {
    content: 'This is a tooltip with a type class "warning"',
    typeClass: 'warning',
  });

  assertTooltipProperties(assert, 'with-type-class-error', {
    content: 'This is a tooltip with a type class "error"',
    typeClass: 'error',
  });
});
