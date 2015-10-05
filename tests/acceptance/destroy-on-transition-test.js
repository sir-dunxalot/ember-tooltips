import Ember from 'ember';
import { module, test } from 'qunit';
import selectorFor from '../helpers/selector-for';
import startApp from '../helpers/start-app';

let application;

module('Acceptance | destroy on transition', {

  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },

});

test('visiting /destroy-on-transition', function(assert) {
  const tooltip = 'show-on-click';

  assert.expect(9);

  visit('/destroy-on-transition');

  andThenAfterRender(function() {
    assert.equal(currentURL(), '/destroy-on-transition',
      'Should be on correct route');

    assertTooltipProperties(assert, tooltip, {
      content: 'Should be removed on transition',
      event: 'click',
    });

  });

  click(selectorFor(tooltip));

  andThenAfterRender(function() {

    assert.ok(inspect(tooltip).length,
      'The tooltip should be in the DOM');

  });

  visit('/');

  andThen(function() {

    assert.ok(inspect(tooltip).length === 0,
      'The tooltip should not be in the DOM after a route transition');

  });

});
