import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

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
