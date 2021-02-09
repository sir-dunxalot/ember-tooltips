import { triggerEvent, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Acceptance | acceptance', function (hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function (assert) {
    assert.expect(12);

    await visit('/acceptance');

    assertTooltipNotRendered(assert);

    const tooltipTargets = document.querySelectorAll('.js-test-tooltip-target');
    const tooltipTarget = tooltipTargets[0];
    const tooltipOptions = {
      selector: '.js-test-tooltip',
    };

    assert.equal(tooltipTargets.length, 1, 'there should be one tooltipTarget');

    assertTooltipNotRendered(assert, tooltipOptions);

    await triggerEvent(tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, tooltipOptions);

    assertTooltipVisible(assert, tooltipOptions);

    await triggerEvent(tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, tooltipOptions);

    const popoverTargets = document.querySelectorAll('.js-test-popover-target');
    const popoverTarget = popoverTargets[0];
    const popoverOptions = {
      selector: '.js-test-popover',
    };

    assert.equal(popoverTargets.length, 1, 'there should be one popoverTarget');

    assertTooltipNotRendered(assert, popoverOptions);

    await triggerEvent(popoverTarget, 'mouseenter');

    assertTooltipRendered(assert, popoverOptions);

    assertTooltipVisible(assert, popoverOptions);

    await triggerEvent(popoverTarget, 'mouseleave');

    assertTooltipNotVisible(assert, popoverOptions);

    assert.equal(
      findTooltip(null, { multiple: true }).length,
      2,
      'There should only be 2 tooltips or popovers rendered'
    );
  });
});
