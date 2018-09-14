import { visit } from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from '../../tests/helpers/ember-tooltips';

module('Acceptance | acceptance', function(hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function(assert) {
    assert.expect(12);

    await visit('/acceptance');

    const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';

    assert.equal($(tooltipOrPopoverSelector).length, 0,
        'initially there should be 0 tooltips or popovers rendered');

    const $tooltipTarget = $('.js-test-tooltip-target');
    const options = {
      selector: '.js-test-tooltip',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, options);

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert, options);
    }); // Default hideDelay = 250

    const $popoverTarget = $('.js-test-popover-target');
    const options = {
      selector: '.js-test-popover',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipRendered(assert, options);

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert, options);
    }, 500); // Default hideDelay = 250

    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'There should only be 2 tooltips or popovers rendered');
  });
});
