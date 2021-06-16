import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

async function testTooltipDelay(assert, template) {
  await render(template);

  const { element } = this;

  assertTooltipNotRendered(assert);

  triggerEvent(element, 'mouseenter');

  /* Check the tooltip is not rendered until the delay */

  later(() => {
    assertTooltipNotRendered(assert);
  }, 250);

  await settled();

  /* Check the tooltip is shown after the delay */

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  /* Check the tooltip still hides immediately when it's supposed to be hidden */

  triggerEvent(element, 'mouseleave');

  await settled();

  assertTooltipNotVisible(assert);
}

module('Integration | Option | delay', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip animates with delay passed as a number', async function (assert) {
    assert.expect(5);
    await testTooltipDelay.call(this, assert, hbs`{{ember-tooltip delay=300}}`);
  });

  test('ember-tooltip animates with delay passed as a string', async function (assert) {
    assert.expect(5);
    await testTooltipDelay.call(
      this,
      assert,
      hbs`{{ember-tooltip delay='300'}}`
    );
  });

  test('ember-tooltip does not call onHide if hidden before delay expires', async function(assert) {
    assert.expect(3);

    this.set('onHide', function () {
      assert.ok(false, "Should not have called onHide");
    });

    await render(hbs`{{ember-tooltip delay=300 onHide=onHide}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    // Trigger show
    triggerEvent(element, 'mouseenter');

    later(() => {
      assertTooltipNotRendered(assert);

      // Leave part way through delay
      triggerEvent(element, 'mouseleave');
    }, 250);

    await settled();

    assertTooltipNotRendered(assert);
  })
});
