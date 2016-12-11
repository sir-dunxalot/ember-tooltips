import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipEvent, assertTooltipRendered } from '../../../helpers/ember-tooltips';

moduleForComponent('tether-popover-on-component', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-popover-on-component renders', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#some-component}}
      {{#tether-popover-on-component}}
        template block text
      {{/tether-popover-on-component}}
    {{/some-component}}
  `);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test("tether-popover-on-component targets it's parent view", function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#some-component class="target-component"}}
      {{#tether-popover-on-component event="click"}}
        template block text
      {{/tether-popover-on-component}}
    {{/some-component}}
  `);

  const $popoverTarget = this.$().find('.target-component');
  const $body = $popoverTarget.parents('body');

  assertTooltipRendered($body, assert);

  assert.ok($popoverTarget.hasClass('ember-tooltip-or-popover-target'));

  triggerTooltipEvent(this.$(), 'click', {selector: '.target-component'});

  assertTooltipVisible($body, assert);

  triggerTooltipEvent(this.$(), 'click', {selector: '.target-component'});

  assertTooltipNotVisible($body, assert);

});
