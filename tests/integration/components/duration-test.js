import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | duration', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides after the given duration', async function(assert) {
    const done = assert.async();

    assert.expect(3);

    await render(hbs`{{ember-tooltip duration=300}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {

      /* Check the tooltip is shown */

      assertTooltipVisible(assert);

      /* Check the tooltip is hidden after the duration */

      run.later(() => {
        assertTooltipNotVisible(assert);
        done();
      }, 300);
    });

  });

  test('ember-tooltip hides before the given duration, if requested', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip duration=300}}`);

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

  test('ember-tooltip uses duration after the first show', async function(assert) {

    assert.expect(5);

    await render(hbs`{{ember-tooltip duration=300}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      /* Hide the tooltip */

      triggerTooltipTargetEvent(this.$(), 'mouseleave');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);

        /* Reshow the tooltip and check it still hides after the duration */

        triggerTooltipTargetEvent(this.$(), 'mouseenter');

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);

          afterTooltipRenderChange(assert, () => {
            assertTooltipNotVisible(assert);
          }, 500);
        });
      });
    });

  });
});
