import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'ember-tooltips/test-support';

module('Integration | Option | hideOn', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides with hideOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip hideOn='click'}}`);

    assertTooltipNotRendered(assert);

    /* Check hover triggers tooltip */

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipVisible(assert);

    /* Check click hides tooltip */

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipNotVisible(assert);
  });
});
