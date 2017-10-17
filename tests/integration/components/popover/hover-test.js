import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  findTooltip,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-popover', 'Integration | Option | hover', {
  integration: true,
});

test('Popover: hover target, hover elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`{{ember-popover event='hover'}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    assertTooltipVisible(assert);

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 300);
  });
});

test('Popover: hover target, hover popover (too slow)', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-popover event='hover'}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 500);
  });
});

test('Popover: hover target, hover inbetween, hover popover, hover elsewhere', function(assert) {

  /*
  Timeline: the popover should only hide if neither elements
  have been moused-over within the 250ms default hideDelay
  0 hidden
  0 target.mouseenter
  0 shown
  0 target.mouseleave
  0 shown
  100 popover.mouseenter
  200 shown
  300 popover.mouseleave
  400 shown
  1000 hidden
  */

  assert.expect(6);

  this.render(hbs`{{ember-popover event='hover'}}`);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      afterTooltipRenderChange(assert, () => {
        triggerTooltipTargetEvent($popoverTarget, 'mouseenter');
      }, 100);

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);
      }, 200);

      afterTooltipRenderChange(assert, () => {
        triggerTooltipTargetEvent(findTooltip(), 'mouseleave');
      }, 300);

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);
      }, 400);

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      }, 1000);
    });
  });
});
