import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | hover', {
  integration: true,
});

test('Popover: hover target, hover elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="hover" hideDelay="100"}}`);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

  assertTooltipVisible(assert);

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, 200);

});

test('Popover: hover target, hover popover (too slow)', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="hover"}}`);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

  run.later(() => {
    let wasEventTriggered = triggerTooltipTargetEvent($popoverTarget, 'mouseenter', { selector: '.ember-popover' });

    assert.equal(wasEventTriggered, false,
        'the user was too slow therefore the mouseenter event was never triggered');

    assertTooltipNotVisible(assert);
    done();
  }, 500);

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

  this.render(hbs`{{popover-on-element event="hover"}}`);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

  assertTooltipVisible(assert);

  run.later(() => {
    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');
  }, 100);

  run.later(() => {
    assertTooltipVisible(assert);
  }, 200);

  run.later(() => {
    triggerTooltipTargetEvent($popoverTarget, 'mouseleave', { selector: '.ember-popover' });
  }, 300);

  run.later(() => {
    assertTooltipVisible(assert);
  }, 400);

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, 1000);

});
