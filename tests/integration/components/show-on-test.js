import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | showOn', {
  integration: true,
});

test('tooltip-on-element shows with showOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element showOn='click'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check hover doesn't trigger tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipNotVisible(assert);

  /* Check click does trigger tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipVisible(assert);

});
