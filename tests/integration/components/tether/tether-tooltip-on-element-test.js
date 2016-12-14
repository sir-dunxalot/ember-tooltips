import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent, assertTooltipRendered } from '../../../helpers/ember-tooltips';

moduleForComponent('tether-tooltip-on-element', 'Integration | Component | tether tooltip on element', {
  integration: true
});

test('tether-tooltip-on-element renders', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#tether-tooltip-on-element}}
      template block text
    {{/tether-tooltip-on-element}}
  `);


  assertTooltipRendered(assert);

});

test("tether-tooltip-on-element targets it's parent view", function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#tether-tooltip-on-element event="click"}}
      template block text
    {{/tether-tooltip-on-element}}
  `);

  const $tooltipTarget = this.$();

  assertTooltipRendered(assert);

  assert.ok($tooltipTarget.hasClass('ember-tooltip-or-popover-target'));

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});
