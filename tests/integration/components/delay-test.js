import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import {
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | delay', {
  integration: true,
});

test('tooltip-on-element animates with delay passed as a number', function(assert) {

  assert.expect(4);

  this.render(hbs`{{tooltip-on-element delay=300}}`);

  const done = assert.async();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Check the tooltip is shown after the correct delay */

  run.later(() => {
    assertTooltipNotVisible(assert);
  }, 290);

  run.later(() => {
    assertTooltipVisible(assert);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    triggerTooltipTargetEvent(this.$(), 'mouseleave');
    assertTooltipNotVisible(assert);
    done();
  }, 350);

});

test('tooltip-on-element animates with delay passed as a string', function(assert) {

  assert.expect(4);

  this.render(hbs`{{tooltip-on-element delay='300'}}`);

  const done = assert.async();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Check the tooltip is shown after the correct delay */

  run.later(() => {

    /* Tether should be enabled, because the tooltip must
    be positioned before it is shown */

    assertTooltipNotVisible(assert);
  }, 290);

  run.later(() => {
    assertTooltipVisible(assert);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    triggerTooltipTargetEvent(this.$(), 'mouseleave');
    assertTooltipNotVisible(assert);
    done();
  }, 350);

});
