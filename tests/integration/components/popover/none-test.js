import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, triggerTooltipEvent, assertTooltipNotRendered } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover: never shows with none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event='none'}}`);

  const $popoverTarget = this.$();
  const $body = $popoverTarget.parents('body');

  assertTooltipNotRendered($body, assert);

  /* Check focus */

  triggerTooltipEvent($popoverTarget, 'focus');

  assertTooltipNotVisible($body, assert);

  /* Check hover */

  triggerTooltipEvent($popoverTarget, 'mouseenter');

  assertTooltipNotVisible($body, assert);

  /* Check click */

  triggerTooltipEvent($popoverTarget, 'click');

  assertTooltipNotVisible($body, assert);

});
