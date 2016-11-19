import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent, assertTooltipRendered } from '../../../helpers/ember-tooltips';

moduleForComponent('tether-tooltip-on-component', 'Integration | Component | tether tooltip on component', {
  integration: true
});

test('tether-tooltip-on-component renders', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#some-component}}
      {{#tether-tooltip-on-component}}
        template block text
      {{/tether-tooltip-on-component}}
    {{/some-component}}
  `);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test("tether-tooltip-on-component targets it's parent view", function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#some-component class="target-component"}}
      {{#tether-tooltip-on-component event="click"}}
        template block text
      {{/tether-tooltip-on-component}}
    {{/some-component}}
  `);

  const $tooltipTarget = this.$();
  const $body = $tooltipTarget.parents('body');

  assertTooltipRendered($body, assert);

  assert.ok($tooltipTarget.find('.target-component').hasClass('ember-tooltip-or-popover-target'));

  triggerTooltipEvent($tooltipTarget, 'click', {selector: '.target-component'});

  assertTooltipVisible($body, assert);

  triggerTooltipEvent($tooltipTarget, 'click', {selector: '.target-component'});

  assertTooltipNotVisible($body, assert);

});
