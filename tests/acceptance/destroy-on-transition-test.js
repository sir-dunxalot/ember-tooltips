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

  andThen(function() {

    assert.equal(currentURL(), '/destroy-on-transition',
      'Should be on correct route');

    assertTooltipProperties(assert, tooltip, {
      content: 'Should be removed on transition',
      event: 'click',
    });

  });

  click(selectorFor(tooltip));

  andThen(function() {

    assert.ok(inspect(tooltip).length,
      'The tooltip should be in the DOM');

  });

  visit('/');

  andThen(function() {

    assert.ok(inspect(tooltip).length === 0,
      'The tooltip should not be in the DOM after a route transition');

  });

});

test('visiting /destroy-on-transition and a tooltip in a `link-to` component', function(assert) {
  const tooltip = 'link-with-tooltip';

  visit('/destroy-on-transition');

  andThen(function() {

    assert.equal(currentURL(), '/destroy-on-transition',
      'Should be on correct route');

    assertTooltipProperties(assert, tooltip, {
      content: 'Tooltip on link should be removed on transition',
    });

  });

  andThen(function() {
    assert.equal(Ember.$('.tooltip').length, 0);
  });

  mouseOver(tooltip);

  andThen(function() {
    assert.equal(Ember.$('.tooltip').length, 1);
  });

  click(selectorFor(tooltip));

  andThen(function() {
    assert.equal(Ember.$('.tooltip').length, 0);
  });
});
