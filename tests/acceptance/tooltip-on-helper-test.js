import Ember from 'ember';
import { module, test } from 'qunit';
import selectorFor from '../helpers/selector-for';
import startApp from '../helpers/start-app';

let application;

module('Acceptance | tooltip on helper', {

  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },

});

test('Rendering tooltips set on helpers', function(assert) {

  assert.expect(19);

  visit('/tooltip-on-helper');

  assertTooltipProperties(assert, 'on-inline-component', {
    content: 'This is a tooltip on an inline component',
  });

  assertTooltipProperties(assert, 'on-block-component', {
    content: 'This is a tooltip on a block component',
  });

  assertTooltipProperties(assert, 'showing-on-click', {
    content: 'This shows on a click event',
    event: 'click',
  });

  mouseOver('on-link-to'); // Show the tooltip

  click(selectorFor('on-link-to'));

  andThen(function() {

    assert.notOk(inspect('on-link-to', false),
      'There should be no tooltip in the DOM after transition');

  });

});
