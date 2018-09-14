import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | isShown', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip toggles with isShown', async function(assert) {

    assert.expect(3);

    this.set('showTooltip', true);

    await render(hbs`{{ember-tooltip isShown=showTooltip}}`);

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      this.set('showTooltip', false);

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);

        this.set('showTooltip', true);

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);
        });
      });
    });
  });
});
