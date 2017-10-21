import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | showOn', {
  integration: true,
});

test('ember-tooltip shows with showOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip showOn='click'}}`);

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
