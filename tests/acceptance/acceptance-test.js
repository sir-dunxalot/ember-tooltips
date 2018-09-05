import $ from 'jquery';
import { run } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from '../../tests/helpers/ember-tooltips';

/* globals andThen, visit */
moduleForAcceptance('Acceptance | acceptance');

test('all acceptance tests', function(assert) {
  visit('/acceptance');

  const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';

  andThen(() => {
    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'initially there should only be 2 tooltips or popovers rendered');
  });

  andThen(() => {

    assert.ok(true, '-------------- begin section 1 --------------');

    const $tooltipTarget = $('.js-test-tooltip-target-enableLazyRendering-false');
    const options = {
      selector: '.js-test-tooltip-enableLazyRendering-false',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipRendered(assert, options);

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

  });

  andThen(() => {

    assert.ok(true, '-------------- begin section 2 --------------');

    const $tooltipTarget = $('.js-test-tooltip-target-enableLazyRendering-true');
    const options = {
      selector: '.js-test-tooltip-enableLazyRendering-true',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, options);

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

  });

  andThen(() => {

    assert.ok(true, '-------------- begin section 3 --------------');

    const $popoverTarget = $('.js-test-popover-target-enableLazyRendering-false');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-false',
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

    assert.ok(true, '-------------- begin section 4 --------------');

    const $popoverTarget = $('.js-test-popover-target-enableLazyRendering-true');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-true',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    run.later(() => {
      assertTooltipNotVisible(assert, options);
    }, 300); // Default hideDelay = 250

  });

  andThen(() => {

    assert.ok(true, '-------------- begin section 5 --------------');

    const $popoverTarget = $('.js-test-popover-target-enableLazyRendering-true-no-delay');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-true-no-delay',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

  });

  andThen(() => {
    assert.equal($(tooltipOrPopoverSelector).length, 5,
        'initially there should only be 2 tooltips or popovers rendered');
  });

});
