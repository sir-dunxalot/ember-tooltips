import { triggerEvent, visit, waitFor } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Acceptance | updateFor reposition stability', function (hooks) {
  setupApplicationTest(hooks);

  test('updateFor reposition stability', async function (assert) {
    assert.expect(7);

    await visit('/update-for-reposition');

    assertTooltipNotRendered(assert);

    const tooltipSelector = '.js-test-tooltip';
    const tooltipTargets = document.querySelectorAll('.js-test-tooltip-target');
    const tooltipTarget = tooltipTargets[0];
    const tooltipOptions = {
      selector: tooltipSelector,
    };

    assert.equal(tooltipTargets.length, 1, 'there should be one tooltipTarget');

    assertTooltipNotRendered(assert, tooltipOptions);

    triggerEvent(tooltipTarget, 'mouseenter');
    await waitFor('.js-test-loading', { count: 1 });

    let tooltip = document.querySelector(tooltipSelector);
    const originalTooltipPosBottom = Math.floor(
      tooltip.getClientRects()[0].bottom
    );

    assertTooltipRendered(assert, tooltipOptions);
    assertTooltipVisible(assert, tooltipOptions);

    await waitFor('.js-test-table', { timeout: 1200, count: 1 });

    const newTooltipPosBottom = Math.floor(tooltip.getClientRects()[0].bottom);
    assert.equal(originalTooltipPosBottom, newTooltipPosBottom);

    await triggerEvent(tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, tooltipOptions);
  });
});
