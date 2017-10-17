import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | hideOn', {
  integration: true,
});

test('ember-tooltip hides with hideOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip hideOn='click'}}`);

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
