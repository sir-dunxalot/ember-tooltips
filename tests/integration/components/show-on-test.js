import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | showOn', {
  integration: true
});

test('tooltip-on-element shows with showOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element showOn='click'}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  /* Check hover doesn't trigger tooltip */

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipNotVisible($body, assert);

  /* Check click does trigger tooltip */

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipVisible($body, assert);

});
