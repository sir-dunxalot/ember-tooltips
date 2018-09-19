import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  findTooltip,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | hover', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: hover target, hover elsewhere', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ember-popover event='hover'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipNotVisible(assert);
  });

  // test('Popover: hover target, hover popover (too slow)', async function(assert) {
  //   assert.expect(3);

  //   await render(hbs`{{ember-popover event='hover'}}`);

  //   assertTooltipNotRendered(assert);

  //   await triggerTooltipTargetEvent(this.$(), 'mouseenter');

  //   assertTooltipVisible(assert);

  //   await triggerTooltipTargetEvent(this.$(), 'mouseleave');

  //   assertTooltipNotVisible(assert);
  // });

  test('Popover: hover target, hover inbetween, hover popover, hover elsewhere', async function(assert) {

    /*
    Timeline: the popover should only hide if neither elements
    have been moused-over within the 250ms default hideDelay
    0 hidden
    0 target.mouseenter
    0 shown
    0 target.mouseleave
    0 shown
    100 popover.mouseenter
    200 shown
    300 popover.mouseleave
    400 shown
    1000 hidden
    */

    assert.expect(5);

    await render(hbs`{{ember-popover event='hover'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipVisible(assert);

    await triggerEvent('.ember-popover', 'mouseenter');

    assertTooltipVisible(assert);

    await triggerEvent('.ember-popover', 'mouseleave');

    assertTooltipNotVisible(assert);
  });
});
