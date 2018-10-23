import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

module('Integration | Option | duration', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides after the given duration', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip duration=300}}`);

    assertTooltipNotRendered(assert);

    triggerEvent(this.element, 'mouseenter');

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

    const { element } = this;

    triggerEvent(element, 'mouseenter');

    /* Once the tooltip is shown but before it auto-hides trigger it to hide */

    later(() => {
      assertTooltipVisible(assert);

      triggerEvent(element, 'mouseleave');
    }, 50);

    later(() => {
      assertTooltipNotVisible(assert);
    }, 100);
  });

  test('ember-tooltip uses duration after the first show', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-tooltip duration=300}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'mouseenter');

    /* Hide the tooltip */

    await triggerEvent(element, 'mouseleave');

    assertTooltipNotVisible(assert);

    /* Reshow the tooltip and check it still hides after the duration */

    triggerEvent(element, 'mouseenter');

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
