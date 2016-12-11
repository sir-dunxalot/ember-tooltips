import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, triggerTooltipEvent, assertTooltipVisible } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | showDelay', {
  integration: true
});

test('tooltip-on-element animates with delay passed as a number', function(assert) {

  assert.expect(4);

  this.render(hbs`{{tooltip-on-element showDelay=300}}`);

  const done = assert.async();
  const $body = this.$().parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent(this.$(), 'mouseenter');

  /* Check the tooltip is shown after the correct delay */

  run.later(() => {
    assertTooltipNotVisible($body, assert);
  }, 290);

  run.later(() => {
    assertTooltipVisible($body, assert);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    triggerTooltipEvent(this.$(), 'mouseleave');
    assertTooltipNotVisible($body, assert);
    done();
  }, 350);

});

test('tooltip-on-element animates with delay passed as a string', function(assert) {

  assert.expect(4);

  this.render(hbs`{{tooltip-on-element showDelay='300'}}`);

  const done = assert.async();
  const $body = this.$().parents('body');

  assertTooltipNotVisible($body, assert);

  triggerTooltipEvent(this.$(), 'mouseenter');

  /* Check the tooltip is shown after the correct delay */

  run.later(() => {
    // tether should be enabled, because the tooltip must be positioned
    // before it is shown
    assertTooltipNotVisible($body, assert);
  }, 290);

  run.later(() => {
    assertTooltipVisible($body, assert);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    triggerTooltipEvent(this.$(), 'mouseleave');
    assertTooltipNotVisible($body, assert);
    done();
  }, 350);

});
