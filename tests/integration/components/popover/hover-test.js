import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | hover', {
  integration: true
});

test('Popover: hover target, hover elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="hover" hideDelay="100"}}`);

  const done = assert.async();
  const $popoverTarget = this.$();
  const $body = $popoverTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseleave');

  assertTooltipVisible($body, assert);

  run.later(() => {
    assertTooltipNotVisible($body, assert);
    done();
  }, 200);

});

test('Popover: hover target, hover popover (too slow)', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="hover"}}`);

  const done = assert.async();
  const $popoverTarget = this.$();
  const $body = $popoverTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseleave');

  run.later(() => {
    let wasEventTriggered = triggerTooltipEvent($popoverTarget, 'mouseenter', {selector: '.ember-popover'});

    assert.equal(wasEventTriggered, false,
        'the user was too slow therefore the mouseenter event was never triggered');

    assertTooltipNotVisible($body, assert);
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
  const $body = $popoverTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($popoverTarget, 'mouseleave');

  assertTooltipVisible($body, assert);

  run.later(() => {
    triggerTooltipEvent($popoverTarget, 'mouseenter');
  }, 100);

  run.later(() => {
    assertTooltipVisible($body, assert);
  }, 200);

  run.later(() => {
    triggerTooltipEvent($popoverTarget, 'mouseleave', {selector: '.ember-popover'});
  }, 300);

  run.later(() => {
    assertTooltipVisible($body, assert);
  }, 400);

  run.later(() => {
    assertTooltipNotVisible($body, assert);
    done();
  }, 1000);

});
