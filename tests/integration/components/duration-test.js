import { run, later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | duration', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides after the given duration', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip duration=300}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    /* Check the tooltip is shown before the duration is up */

    later(() => {
      assertTooltipVisible(assert);
    }, 200);

    /* Check the tooltip is hidden after the duration */

    later(() => {
      assertTooltipNotVisible(assert);
    }, 400);
  });

  test('ember-tooltip hides before the given duration, if requested', async function(assert) {

    assert.expect(2);

    await render(hbs`{{ember-tooltip duration=300}}`);

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    /* Once the tooltip is shown but before it auto-hides trigger it to hide */

    later(() => {
      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'mouseleave');
    }, 50);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 100);
  });

  test('ember-tooltip uses duration after the first show', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-tooltip duration=300}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    /* Hide the tooltip */

    await triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipNotVisible(assert);

    /* Reshow the tooltip and check it still hides after the duration */

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    /* Check the tooltip is shown before the duration is up */

    later(() => {
      assertTooltipVisible(assert);
    }, 200);

    /* Check the tooltip is hidden after the duration */

    later(() => {
      assertTooltipNotVisible(assert);
    }, 400);
  });
});
