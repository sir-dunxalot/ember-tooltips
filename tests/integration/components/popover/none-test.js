import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | event', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: never shows with none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{ember-popover event='none'}}`);

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
});
