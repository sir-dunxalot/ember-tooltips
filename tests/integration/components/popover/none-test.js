import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-popover', 'Integration | Option | event', {
  integration: true,
});

test('Popover: never shows with none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{ember-popover event='none'}}`);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  /* Check focus */

  triggerTooltipTargetEvent($popoverTarget, 'focus');

  afterTooltipRenderChange(assert, () => {

    assertTooltipNotRendered(assert);

    /* Check hover */

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotRendered(assert);

      /* Check click */

      triggerTooltipTargetEvent($popoverTarget, 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotRendered(assert);
      });
    });
  });
});
