import { hbs } from 'ember-cli-htmlbars';
import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Component | show-hide-show', function (hooks) {
  setupRenderingTest(hooks);

  // Prevents a race condition regression between hiding and showing the tooltip when the user moves their mouse over quickly.
  test('ember-tooltip shows after quickly showing then hiding then showing again.', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip}}`);

    assertTooltipNotRendered(assert);
    triggerEvent(this.element, 'mouseenter');
    triggerEvent(this.element, 'mouseleave');
    triggerEvent(this.element, 'mouseenter');

    // Wait at least 200 ms (animation time) for a hide to potentially fire then check for visibility. Should still be visible.
    later(() => {
      assertTooltipRendered(assert);
      assertTooltipVisible(assert);
    }, 250);

    await settled();
  });
});
