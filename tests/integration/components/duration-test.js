import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | duration', {
  integration: true
});

test('tooltip-on-element hides after the given duration', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  const done = assert.async();
  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  /* Check the tooltip is hidden after the duration */

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  run.later(() => {
    assertTooltipNotVisible($body, assert);
    done();
  }, 500);

});

test('tooltip-on-element hides before the given duration, if requested', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible($body, assert);

});

test('tooltip-on-element uses duration after the first show', function(assert) {

  assert.expect(5);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  const done = assert.async();
  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible($body, assert);

  /* Check the tooltip is hidden after the duration */

  triggerTooltipEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible($body, assert);

  run.later(() => {
    assertTooltipNotVisible($body, assert);
    done();
  }, 500);

});
