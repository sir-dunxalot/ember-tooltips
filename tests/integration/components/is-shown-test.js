import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

module('Integration | Option | isShown', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip toggles with isShown', async function(assert) {

    assert.expect(3);

    this.set('showTooltip', true);

    await render(hbs`{{ember-tooltip isShown=showTooltip}}`);

    assertTooltipVisible(assert);

    this.set('showTooltip', false);

    await settled();

    assertTooltipNotVisible(assert);

    this.set('showTooltip', true);

    await settled();

    assertTooltipVisible(assert);
  });
});
