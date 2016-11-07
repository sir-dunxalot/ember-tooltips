import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRendered, assertPopoverShow, assertPopoverHide } from '../../../helpers/sync/assert-visibility';

moduleForComponent('tether-popover-on-component', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-popover-on-component renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#some-component}}
      {{#tether-popover-on-component}}
        template block text
      {{/tether-popover-on-component}}
    {{/some-component}}
  `);

  assertRendered(assert, this);
});

test("tether-popover-on-component targets it's parent view", function(assert) {

  assert.expect(7);

  this.render(hbs`
    {{#some-component class="target-component"}}
      {{#tether-popover-on-component event="click"}}
        template block text
      {{/tether-popover-on-component}}
    {{/some-component}}
  `);

  assertRendered(assert, this);

  const $targetComponent = this.$().find('.target-component');

  assert.ok($targetComponent.hasClass('ember-tooltip-or-popover-target'));

  Ember.run(() => {
    $targetComponent.trigger('mousedown');
    $targetComponent.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  Ember.run(() => {
    $targetComponent.trigger('mousedown');
    $targetComponent.trigger('mouseup');
  });

  assertPopoverHide(assert, this);
});
