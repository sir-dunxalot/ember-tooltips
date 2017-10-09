import { moduleForComponent, test } from 'ember-qunit';
import {
	assertTooltipNotVisible,
	assertTooltipVisible,
	triggerTooltipTargetEvent,
	assertTooltipNotRendered,
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Option | click', {
  integration: true,
});

test('Tooltip: focusin/click input, click input', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <input id="some-input">
    {{ember-tooltip event="click" target="#some-input" enableLazyRendering=true}}
  `);

  const $tooltipTarget = this.$('#some-input');

  assertTooltipNotRendered(assert);

  /* We intentionally trigger a focusin and click on the $tooltipTarget because
  when a user clicks an input both events occur in that order.
  We have fixed this with _isInProcessOfShowing and this test protects that. */

  triggerTooltipTargetEvent($tooltipTarget, 'focusin');
  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assertTooltipNotVisible(assert);

});
