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

module('Integration | Option | hideOn', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides with hideOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip hideOn='click'}}`);

    assertTooltipNotRendered(assert);

    /* Check hover triggers tooltip */

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      /* Check click hides tooltip */

      triggerTooltipTargetEvent(this.$(), 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      });
    });
  });
});
