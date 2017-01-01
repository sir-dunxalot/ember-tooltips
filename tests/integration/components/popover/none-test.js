import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, triggerTooltipTargetEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true,
});

test('Popover: never shows with none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event='none'}}`);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check focus */

  triggerTooltipTargetEvent($popoverTarget, 'focus');

  assertTooltipNotVisible(assert);

  /* Check hover */

  triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

  assertTooltipNotVisible(assert);

  /* Check click */

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipNotVisible(assert);

});
