import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | showOn', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip shows with showOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{ember-tooltip showOn='click'}}`);

    assertTooltipNotRendered(assert);

    /* Check hover doesn't trigger tooltip */

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {

      assertTooltipNotRendered(assert);

      /* Check click does trigger tooltip */

      triggerTooltipTargetEvent(this.$(), 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);
      });
    });
  });
});
