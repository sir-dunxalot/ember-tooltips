import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRendered, assertShow, assertHide } from '../../../helpers/sync/assert-visibility';

moduleForComponent('tether-tooltip-on-component', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-tooltip-on-component renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#some-component}}
      {{#tether-tooltip-on-component}}
        template block text
      {{/tether-tooltip-on-component}}
    {{/some-component}}
  `);

  assertRendered(assert, this);
});

test("tether-tooltip-on-component targets it's parent view", function(assert) {

  assert.expect(7);

  this.render(hbs`
    {{#some-component class="target-component"}}
      {{#tether-tooltip-on-component event="click"}}
        template block text
      {{/tether-tooltip-on-component}}
    {{/some-component}}
  `);

  const $targetComponent = this.$().find('.target-component');

  assertRendered(assert, this);

  assert.ok($targetComponent.hasClass('ember-tooltip-or-popover-target'));

  Ember.run(() => {
    $targetComponent.trigger('click');
  });

  assertShow(assert, this);

  Ember.run(() => {
    $targetComponent.trigger('click');
  });

  assertHide(assert, this);
});
