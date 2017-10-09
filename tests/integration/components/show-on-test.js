import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Option | showOn', {
  integration: true,
});

test('ember-tooltip shows with showOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip showOn='click'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check hover doesn't trigger tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipNotVisible(assert);

  /* Check click does trigger tooltip */

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipVisible(assert);

});
