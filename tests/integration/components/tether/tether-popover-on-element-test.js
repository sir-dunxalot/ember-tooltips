import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRendered, assertShow, assertHide } from '../../../helpers/sync/assert-visibility';

moduleForComponent('tether-popover-on-element', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-popover-on-element renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#some-component}}
      {{#tether-popover-on-element}}
        template block text
      {{/tether-popover-on-element}}
    {{/some-component}}
  `);

  assertRendered(assert, this);
});

test("tether-popover-on-element targets it's parent view", function(assert) {

  assert.expect(7);

  this.render(hbs`
    {{#some-component class="target-component"}}
      {{#tether-popover-on-element event="click"}}
        template block text
      {{/tether-popover-on-element}}
    {{/some-component}}
  `);

  const $targetComponent = this.$().find('.target-component');

  assertRendered(assert, this);

  assert.ok($targetComponent.hasClass('ember-tooltip-or-popover-target'));

  Ember.run(() => {
    $targetComponent.trigger('mousedown');
    $targetComponent.trigger('mouseup');
  });

  assertShow(assert, this);

  Ember.run(() => {
    $targetComponent.trigger('mousedown');
    $targetComponent.trigger('mouseup');
  });

  assertHide(assert, this);
});
