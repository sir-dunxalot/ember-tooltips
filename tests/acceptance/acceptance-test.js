import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from '../../tests/helpers/ember-tooltips';

const { $, run } = Ember;

moduleForAcceptance('Acceptance | acceptance');

test('all acceptance tests', function(assert) {
  visit('/acceptance');

  const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';

  andThen(() => {
    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'initially there should only be 2 tooltips or popovers rendered');
  });

  /* Begin tooltip tests */

  andThen(() => {

    const $tooltipTarget = $('.js-test-tooltip-target');
    const options = {
      selector: '.js-test-tooltip',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipRendered(assert, options);

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

  });

  /* Begin popover tests */

  andThen(() => {

    const $popoverTarget = $('.js-test-popover-target');
    const options = {
      selector: '.js-test-popover',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipRendered(assert, options);

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    run.later(() => {
      assertTooltipNotVisible(assert, options);
    }, 300); // Default hideDelay = 250

  });

  andThen(() => {
    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'There should only be 2 tooltips or popovers rendered');
  });

});
