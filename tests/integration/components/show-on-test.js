import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | showOn', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip shows with showOn', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-tooltip showOn='click'}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    /* Check hover doesn't trigger tooltip */

    await triggerEvent(element, 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click does trigger tooltip */

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);
  });
});
