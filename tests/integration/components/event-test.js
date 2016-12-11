import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent, assertTooltipNotRendered } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | event', {
  integration: true
});

test('tooltip-on-element toggles with hover', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotRendered($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible($body, assert);

});

test('tooltip-on-element toggles with click', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element event='click'}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotRendered($body, assert);

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipNotVisible($body, assert);

});

test('tooltip-on-element toggles with focus', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element event='focus'}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotRendered($body, assert);

  triggerTooltipEvent($tooltipTarget, 'focus');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'blur');

  assertTooltipNotVisible($body, assert);

});

test('tooltip-on-element does not show when event=none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{tooltip-on-element event='none'}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotRendered($body, assert);

  /* Check focus */

  triggerTooltipEvent($tooltipTarget, 'focus');

  assertTooltipNotVisible($body, assert);

  /* Check hover */

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipNotVisible($body, assert);

  /* Check click */

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipNotVisible($body, assert);

});
