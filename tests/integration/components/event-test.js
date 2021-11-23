import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipNotRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | event', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip toggles with hover', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'mouseenter');

    assertTooltipVisible(assert);

    await triggerEvent(element, 'mouseleave');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip toggles with click', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip event='click'}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);

    await triggerEvent(element, 'click');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip toggles with focus', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip event='focus'}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'focus');

    assertTooltipVisible(assert);

    await triggerEvent(element, 'blur');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip does not show when event=none', async function (assert) {
    assert.expect(4);

    await render(hbs`{{ember-tooltip event='none'}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    /* Check focus */

    await triggerEvent(element, 'focus');

    assertTooltipNotRendered(assert);

    /* Check hover */

    await triggerEvent(element, 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click */

    await triggerEvent(element, 'click');

    assertTooltipNotRendered(assert);
  });

  test('ember-tooltip closes when esc is pressed', async function (assert) {
    assert.expect(2);

    await render(hbs`{{ember-tooltip isShown=true}}`);

    assertTooltipVisible(assert);

    /* Mimic esc being pressed */

    const event = new window.Event('keydown');

    event.which = 27;

    document.dispatchEvent(event);

    await settled();

    assertTooltipNotVisible(assert);
  });
});
