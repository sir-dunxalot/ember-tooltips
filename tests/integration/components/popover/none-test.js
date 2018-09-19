import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
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

    await triggerTooltipTargetEvent($popoverTarget, 'focus');

    assertTooltipNotRendered(assert);

    /* Check hover */

    await triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click */

    await triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipNotRendered(assert);
  });
});
