import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipNotRendered,
	assertTooltipVisible,
	triggerTooltipTargetEvent,
} from 'ember-tooltips/test-support';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | click', function(hooks) {
  setupRenderingTest(hooks);

  test('Tooltip: focusin/click input, click input', async function(assert) {

    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-tooltip event="click" targetId="some-input" enableLazyRendering=true}}
    `);

    const $tooltipTarget = this.$('#some-input');

    assertTooltipNotRendered(assert);

    /* We intentionally trigger a focusin and click on the $tooltipTarget because
    when a user clicks an input both events occur in that order.
    We have fixed this with _isInProcessOfShowing and this test protects that. */

    await triggerTooltipTargetEvent($tooltipTarget, 'focusin');
    await triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);
  });
});
