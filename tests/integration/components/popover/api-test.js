import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent, assertTooltipNotRendered } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | API', {
  integration: true
});

test('Popover: click target, click hide-action', function(assert) {

  assert.expect(3);

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hide-action' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', {selector: '.hide-action'});

  assertTooltipNotVisible(assert);

});

test('Popover: click target, click hide-action, click target', function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hide-action' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', {selector: '.hide-action'});

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

});

test('Popover: click target, click popover, click hide-action, click target', function(assert) {

  assert.expect(5);

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hide-action' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', {selector: '.ember-popover'});

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', {selector: '.hide-action'});

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

});
