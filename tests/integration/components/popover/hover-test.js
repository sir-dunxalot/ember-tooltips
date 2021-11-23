import { hbs } from 'ember-cli-htmlbars';
import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Option | hover', function (hooks) {
  setupRenderingTest(hooks);

  test('Popover: hover target, hover elsewhere', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <div class="test-hover-target">
        Hover over me!
        <EmberPopover @event="hover" @text="hello I am here!" />
      </div>
    `);

    const target = find('.test-hover-target');

    assertTooltipNotRendered(assert);

    await triggerEvent(target, 'mouseenter');

    assertTooltipRendered(assert);

    assertTooltipVisible(assert);

    triggerEvent(target, 'mouseleave');

    assertTooltipVisible(assert);

    later(() => {
      assertTooltipRendered(assert);
      assertTooltipNotVisible(assert);
    }, 300);

    await settled();
  });

  test('Popover: hover target, hover popover (too slow)', async function (assert) {
    assert.expect(6);

    await render(hbs`
      <div class="test-hover-target">
        Hover over me!
        <EmberPopover @event="hover" @text="hello I am here!" />
      </div>
    `);

    const target = find('.test-hover-target');

    assertTooltipNotRendered(assert);

    await triggerEvent(target, 'mouseenter');

    assertTooltipRendered(assert);

    assertTooltipVisible(assert);

    triggerEvent(target, 'mouseleave');

    assertTooltipVisible(assert);

    later(() => {
      assertTooltipRendered(assert);
      assertTooltipNotVisible(assert);
    }, 500);

    await settled();
  });

  test('Popover: hover target, hover inbetween, hover popover, hover elsewhere', async function (assert) {
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

    assert.expect(9);

    await render(hbs`
      <div class="test-hover-target">
        Hover over me!
        <EmberPopover @event="hover" @text="hello I am here!" />
      </div>
    `);

    const target = find('.test-hover-target');

    assertTooltipNotRendered(assert);

    await triggerEvent(target, 'mouseenter');

    assertTooltipRendered(assert);

    assertTooltipVisible(assert);

    triggerEvent(target, 'mouseleave');

    assertTooltipVisible(assert);

    /* 100ms is less than the default popoverHideDelay, which is 250ms
    so the tooltip should not have disappeared yet */

    later(() => {
      assertTooltipVisible(assert);

      const popover = findTooltip();
      triggerEvent(popover, 'mouseenter');
    }, 100);

    later(() => {
      assertTooltipVisible(assert);
    }, 200);

    later(() => {
      const popover = findTooltip();
      triggerEvent(popover, 'mouseleave');
    }, 300);

    later(() => {
      assertTooltipRendered(assert);
      assertTooltipVisible(assert);
    }, 400);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 1000);

    await settled();
  });
});
