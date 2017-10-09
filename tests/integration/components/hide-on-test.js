import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Option | hideOn', {
  integration: true,
});

test('ember-tooltip hides with hideOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip hideOn='click'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check hover triggers tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  /* Check click hides tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});
