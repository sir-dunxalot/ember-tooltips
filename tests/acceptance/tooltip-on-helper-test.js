import Ember from 'ember';
import { module, test } from 'qunit';
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

  assert.expect(24);

  visit('/tooltip-on-helper');

  assertTooltipProperties(assert, 'on-inline-component', {
    content: 'This is a tooltip on an inline component',
  });

  assertTooltipProperties(assert, 'on-block-component', {
    content: 'This is a tooltip on a block component',
  });

  assertTooltipProperties(assert, 'on-link-to', {
    content: 'This is a tooltip on a link-to helper',
  });

  assertTooltipProperties(assert, 'showing-on-click', {
    content: 'This shows on a click event',
    event: 'click',
  });

});
