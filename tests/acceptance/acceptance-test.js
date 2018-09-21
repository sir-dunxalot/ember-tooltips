import { settled, visit } from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  findTooltip,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

module('Acceptance | acceptance', function(hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function(assert) {
    assert.expect(11);

    await visit('/acceptance');

    assertTooltipNotRendered(assert);

    const $tooltipTarget = $('.js-test-tooltip-target');
    const tooltipOptions = {
      selector: '.js-test-tooltip',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered(assert, tooltipOptions);

    await triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, tooltipOptions);

    assertTooltipVisible(assert, tooltipOptions);

    await triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    await settled();

    assertTooltipNotVisible(assert, tooltipOptions);

    const $popoverTarget = $('.js-test-popover-target');
    const popoverOptions = {
      selector: '.js-test-popover',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipNotRendered(assert, popoverOptions);

    await triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipRendered(assert, popoverOptions);

    assertTooltipVisible(assert, popoverOptions);

    await triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    await settled();

    assert.equal(findTooltip().length, 2,
        'There should only be 2 tooltips or popovers rendered');
  });
});
