import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent, assertTooltipRendered } from '../../../helpers/ember-tooltips';

moduleForComponent('tether-popover-on-element', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-popover-on-element renders', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#tether-popover-on-element}}
      template block text
    {{/tether-popover-on-element}}
  `);


  assertTooltipRendered(assert);

});

test("tether-popover-on-element targets it's parent view", function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#tether-popover-on-element event="click"}}
      template block text
    {{/tether-popover-on-element}}
  `);

  const $popoverTarget = this.$();

  assertTooltipRendered(assert);

  assert.ok($popoverTarget.hasClass('ember-tooltip-or-popover-target'));

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipNotVisible(assert);

});

test('tether-popover-on-element can use hide API', function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#tether-popover-on-element event="click" as |popover|}}
      <span class='hide-button' {{action popover.hide}}></span>
    {{/tether-popover-on-element}}
  `);

  const $popoverTarget = this.$();

  assertTooltipRendered(assert);

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', {selector: '.hide-button'});

  assertTooltipNotVisible(assert);

});
