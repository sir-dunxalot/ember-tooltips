import { settled, triggerEvent, visit } from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  findTooltip,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

module('Acceptance | acceptance', function(hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function(assert) {
    assert.expect(11);

    await visit('/acceptance');

    assertTooltipNotRendered(assert);

    const $tooltipTarget = $('.js-test-tooltip-target');
    const [ tooltipTarget ] = $tooltipTarget;
    const tooltipOptions = {
      selector: '.js-test-tooltip',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered(assert, tooltipOptions);

    await triggerEvent(tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, tooltipOptions);

    assertTooltipVisible(assert, tooltipOptions);

    await triggerEvent(tooltipTarget, 'mouseleave');

    await settled();

    assertTooltipNotVisible(assert, tooltipOptions);

    const $popoverTarget = $('.js-test-popover-target');
    const [ popoverTarget ] = $popoverTarget;
    const popoverOptions = {
      selector: '.js-test-popover',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipNotRendered(assert, popoverOptions);

    await triggerEvent(popoverTarget, 'mouseenter');

    assertTooltipRendered(assert, popoverOptions);

    assertTooltipVisible(assert, popoverOptions);

    await triggerEvent(popoverTarget, 'mouseleave');

    await settled();

    assert.equal(findTooltip().length, 2,
        'There should only be 2 tooltips or popovers rendered');
  });
});
