import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotVisible,
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | event', {
  integration: true,
});

test('ember-tooltip toggles with hover', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    });
  });
});

test('ember-tooltip toggles with click', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip event='click'}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'click');

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    });
  });
});

test('ember-tooltip toggles with focus', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip event='focus'}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'focus');

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'blur');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    });
  });
});

test('ember-tooltip does not show when event=none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{ember-tooltip event='none'}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotRendered(assert);

  /* Check focus */

  triggerTooltipTargetEvent($tooltipTarget, 'focus');

  afterTooltipRenderChange(assert, () => {

    assertTooltipNotRendered(assert);

    /* Check hover */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotRendered(assert);

      /* Check click */

      triggerTooltipTargetEvent($tooltipTarget, 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotRendered(assert);
      });
    });
  });
});
