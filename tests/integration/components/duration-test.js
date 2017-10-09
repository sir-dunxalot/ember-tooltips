import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('ember-tooltip', 'Integration | Option | duration', {
  integration: true,
});

test('ember-tooltip hides after the given duration', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip duration=300}}`);

  const done = assert.async();
  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  /* Check the tooltip is hidden after the duration */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, 500);

});

test('ember-tooltip hides before the given duration, if requested', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip duration=300}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible(assert);

});

test('ember-tooltip uses duration after the first show', function(assert) {

  assert.expect(5);

  this.render(hbs`{{ember-tooltip duration=300}}`);

  const done = assert.async();
  const $tooltipTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

  assertTooltipNotVisible(assert);

  /* Check the tooltip is hidden after the duration */

  triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

  assertTooltipVisible(assert);

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, 500);

});
