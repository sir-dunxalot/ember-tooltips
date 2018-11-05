import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  findTooltip,
  findTooltipTarget,
} from 'ember-tooltips/test-support';

module('Integration | Option | container', function(hooks) {
  setupRenderingTest(hooks);

  test('by default, the tooltip is rendered adjacent to its target', async function(assert) {
    await render(hbs`
      <div id='tooltip-target'>
        {{ember-tooltip text='tooltip-text'}}
      </div>
    `);
    const expectedContainer = this.element;
    const [ target ] = findTooltipTarget();
    await triggerEvent(target, 'mouseenter');
    const tooltip = findTooltip();
    assert.equal(tooltip.parent()[0], expectedContainer,
      'The tooltip should be a sibling of its target');
  });

  test('the container attribute allows the tooltip parent to be set', async function(assert) {
    await render(hbs`
      <div id='tooltip-container'></div>
      <div id='tooltip-target'>
        {{ember-tooltip text='tooltip-text' container='#tooltip-container'}}
      </div>
    `);
    const expectedContainer = find('#tooltip-container');
    const [ target ] = findTooltipTarget();
    await triggerEvent(target, 'mouseenter');
    const tooltip = findTooltip();
    assert.equal(tooltip.parent()[0], expectedContainer,
      'The element identified by the container attribute should be the tooltip parent');
  });
});
