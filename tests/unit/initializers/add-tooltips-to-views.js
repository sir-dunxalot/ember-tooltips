import Ember from 'ember';
import { initialize } from '../../../initializers/add-tooltips-to-views';
import { module, test } from 'qunit';

let application, container, view;

function createView() {
  view = Ember.View.create();
}

module('Unit | Initializer | add tooltips to views', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('The view reopen() adds the public properties', function(assert) {
  const expectedProperties = {
    tooltip: null,
    tooltipSupportedProperties: [
      'auto',
      'effectClass',
      'event',
      'place',
      'spacing',
      'typeClass'
    ],
    tooltipAuto: true,
    tooltipContent: null,
    tooltipEffectClass: 'slide', // fade, grow, slide, null
    tooltipEvent: 'hover',
    tooltipPlace: 'top',
    tooltipSpacing: null,
    tooltipTypeClass: null,
  };

  assert.expect(9);

  initialize(container, application);
  createView();

  Ember.keys(expectedProperties).forEach(function(expectedProperty) {
    const expectedValue = expectedProperties[expectedProperty];
    const actualValue = view.get(expectedProperty);

    if (expectedValue) {

      assert.deepEqual(actualValue, expectedValue,
        `The view should have a ${expectedProperty} property with a value equal to ${expectedValue}`);

    } else {

      assert.ok(actualValue !== undefined,
        `The view should have a ${expectedProperty} property`);

    }
  });

});

test('The view reopen() adds the public methods', function(assert) {
  initialize(container, application);
  createView();

  assert.ok(!!view.renderTooltip,
    'The view should have a renderTooltip method');

  assert.ok(!!view.renderChildTooltips,
    'The view should have a renderTooltip method');

  view.renderTooltip();

  assert.ok(!view.get('tooltip'),
    'The view should not have a tooltip property after calling renderTooltip when no tooltip content is specified');
});
