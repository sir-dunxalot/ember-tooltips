import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | isShown', {
  integration: true,
});

test('ember-tooltip toggles with isShown', function(assert) {

  assert.expect(3);

  this.set('showTooltip', true);

  this.render(hbs`{{ember-tooltip isShown=showTooltip}}`);

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
