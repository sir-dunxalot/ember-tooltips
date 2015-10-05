import Ember from 'ember';
// import { initialize } from '../../../initializers/ember-tooltips';
import { module, test } from 'qunit';

let application;
let container;

module('Unit | Initializer | add tooltips to components', {

  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  },

});

test('Reopening classes', function(assert) {
  const classes = ['Component'];

  assert.expect(classes.length);

  classes.forEach(function(className) {
    const instance = Ember[className].create();

    assert.strictEqual(instance.get('tooltip'), null,
      `By default the mixin should be added to Ember.${className}`);

  });
});
