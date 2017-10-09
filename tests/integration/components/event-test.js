import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Option | event', {
  integration: true,
});

test('ember-tooltip toggles with hover', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible(assert);

});

test('ember-tooltip toggles with click', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip event='click'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});

test('ember-tooltip toggles with focus', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip event='focus'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'focus');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'blur');

  assertTooltipNotVisible(assert);

});

test('ember-tooltip does not show when event=none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{ember-tooltip event='none'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check focus */

  triggerTooltipTargetEvent($tooltipTarget, 'focus');

  assertTooltipNotVisible(assert);

  /* Check hover */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipNotVisible(assert);

  /* Check click */

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});
