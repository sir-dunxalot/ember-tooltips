import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | hideOn', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip hides with hideOn', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip hideOn='click'}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    /* Check hover triggers tooltip */

    await triggerEvent(element, 'mouseenter');

    assertTooltipVisible(assert);

    /* Check click hides tooltip */

    await triggerEvent(element, 'click');

    assertTooltipNotVisible(assert);
  });
});
