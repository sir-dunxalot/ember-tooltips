import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | hideOn', {
  integration: true
});

test('tooltip-on-element hides with hideOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element hideOn='click'}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  /* Check hover triggers tooltip */

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  /* Check click hides tooltip */

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipNotVisible($body, assert);

});
