import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | hover', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: hover target, hover elsewhere', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='hover'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipVisible(assert);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 300);
  });

  test('Popover: hover target, hover popover (too slow)', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='hover'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipVisible(assert);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 500);
  });

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

    assert.expect(7);

    await render(hbs`{{ember-popover event='hover'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipVisible(assert);

    /* 100ms is less than the default popoverHideDelay, which is 250ms
    so the tooltip should not have disappeared yet */

    later(() => {
      assertTooltipVisible(assert);

      triggerEvent('.ember-popover', 'mouseenter');
    }, 100);

    later(() => {
      assertTooltipVisible(assert);
    }, 200);

    later(() => {
      triggerEvent('.ember-popover', 'mouseleave');
    }, 300);

    later(() => {
      assertTooltipVisible(assert);
    }, 400);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 1000);
  });
});
