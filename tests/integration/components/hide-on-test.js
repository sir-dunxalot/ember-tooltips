import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent, assertTooltipNotRendered } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | hideOn', {
  integration: true
});

test('tooltip-on-element hides with hideOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element hideOn='click'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotRendered(assert);

  /* Check hover triggers tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  /* Check click hides tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});
