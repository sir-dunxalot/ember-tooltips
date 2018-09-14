import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
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

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'mouseleave');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      });
    });
  });

  test('ember-tooltip toggles with click', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip event='click'}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      });
    });
  });

  test('ember-tooltip toggles with focus', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip event='focus'}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'focus');

    afterTooltipRenderChange(assert, () => {

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'blur');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      });
    });
  });

  test('ember-tooltip does not show when event=none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{ember-tooltip event='none'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotRendered(assert);

    /* Check focus */

    triggerTooltipTargetEvent($tooltipTarget, 'focus');

    afterTooltipRenderChange(assert, () => {

      assertTooltipNotRendered(assert);

      /* Check hover */

      triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotRendered(assert);

        /* Check click */

        triggerTooltipTargetEvent($tooltipTarget, 'click');

        afterTooltipRenderChange(assert, () => {
          assertTooltipNotRendered(assert);
        });
      });
    });
  });

  test('ember-tooltip closes when esc is pressed', async function(assert) {

    assert.expect(2);

    await render(hbs`{{ember-tooltip isShown=true}}`);

    afterTooltipRenderChange(assert, () => {

      assertTooltipVisible(assert);

      /* Mimic esc being pressed */

      const event = new window.Event('keydown');

      event.which = 27;

      document.dispatchEvent(event);

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      });
    });
  });
});
