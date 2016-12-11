import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent, assertTooltipRendered } from '../../../helpers/ember-tooltips';

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

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test("tether-tooltip-on-element targets it's parent view", function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#tether-tooltip-on-element event="click"}}
      template block text
    {{/tether-tooltip-on-element}}
  `);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipRendered($body, assert);

  assert.ok($tooltipTarget.hasClass('ember-tooltip-or-popover-target'));

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'click');

  assertTooltipNotVisible($body, assert);

});
