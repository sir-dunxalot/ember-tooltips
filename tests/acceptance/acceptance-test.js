import { settled, visit } from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from '../../tests/helpers/ember-tooltips';

module('Acceptance | acceptance', function(hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function(assert) {
    assert.expect(11);

    await visit('/acceptance');

    const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';

    assert.equal($(tooltipOrPopoverSelector).length, 0,
        'initially there should be 0 tooltips or popovers rendered');

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

    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'There should only be 2 tooltips or popovers rendered');
  });
});
