import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotVisible,
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | event', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip toggles with hover', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip toggles with click', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip event='click'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip toggles with focus', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip event='focus'}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'focus');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'blur');

    assertTooltipNotVisible(assert);
  });

  test('ember-tooltip does not show when event=none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{ember-tooltip event='none'}}`);

    assertTooltipNotRendered(assert);

    /* Check focus */

    await triggerTooltipTargetEvent(this.$(), 'focus');

    assertTooltipNotRendered(assert);

    /* Check hover */

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click */

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipNotRendered(assert);
  });

  test('ember-tooltip closes when esc is pressed', async function(assert) {

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
