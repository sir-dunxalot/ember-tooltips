import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;
const MS_FOR_BLUR = 100;

moduleForComponent('popover-on-element', 'Integration | Option | focus', {
  integration: true,
});

test('Popover: target focus, popover focus, popover blur', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event='focus'}}`);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus', { selector: '.ember-popover' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'blur', { selector: '.ember-popover' });

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, MS_FOR_BLUR);

});

test('Popover: target focus, target-interior focus, popover focus, popover blur', function(assert) {

  assert.expect(5);

  this.render(hbs`
    <a href class="target-interior"></a>
    {{popover-on-element event='focus'}}
  `);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus', { selector: '.target-interior' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus', { selector: '.ember-popover' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'blur', { selector: '.ember-popover' });

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, MS_FOR_BLUR);

});

test('Popover: target focus, popover focus, popover-interior focus, popover blur', function(assert) {

  assert.expect(5);

  this.render(hbs`
    {{#popover-on-element event='focus'}}
      <a href class="popover-interior"></a>
    {{/popover-on-element}}
  `);

  const done = assert.async();
  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus', { selector: '.ember-popover' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'focus', { selector: '.popover-interior' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'blur', { selector: '.ember-popover' });

  run.later(() => {
    assertTooltipNotVisible(assert);
    done();
  }, MS_FOR_BLUR);

});
