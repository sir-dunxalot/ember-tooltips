import Ember from 'ember';
import ComponentsTooltipsNewMixin from 'ember-tooltips/mixins/components/tooltips-new';
import { module, test } from 'qunit';

module('Unit | Mixin | components/tooltips new');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentsTooltipsNewObject = Ember.Object.extend(ComponentsTooltipsNewMixin);
  let subject = ComponentsTooltipsNewObject.create();
  assert.ok(subject);
});
