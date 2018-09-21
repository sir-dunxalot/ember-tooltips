import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'ember-tooltips/test-support';

module('Integration | Option | showOn', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip shows with showOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip showOn='click'}}`);

    assertTooltipNotRendered(assert);

    /* Check hover doesn't trigger tooltip */

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click does trigger tooltip */

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipVisible(assert);
  });
});
