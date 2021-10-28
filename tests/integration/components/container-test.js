import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent } from '@ember/test-helpers';
import {
  findTooltip,
  findTooltipTarget,
} from 'ember-tooltips/test-support/dom';

module('Integration | Option | popperContainer', function (hooks) {
  setupRenderingTest(hooks);

  test('by default, the tooltip is rendered adjacent to its target', async function (assert) {
    await render(hbs`
      <div id='tooltip-target'>
        {{ember-tooltip text='tooltip-text'}}
      </div>
    `);
    const expectedContainer = this.element;
    const target = findTooltipTarget();
    await triggerEvent(target, 'mouseenter');
    const tooltip = findTooltip();
    assert.equal(
      tooltip.parentElement,
      expectedContainer,
      'The tooltip should be a sibling of its target'
    );
  });

  test('the popperContainer attribute allows the tooltip parent to be set', async function (assert) {
    await render(hbs`
      <div id='tooltip-container'></div>
      <div id='tooltip-target'>
        {{ember-tooltip text='tooltip-text' popperContainer='#tooltip-container'}}
      </div>
    `);
    const expectedContainer = find('#tooltip-container');
    const target = findTooltipTarget();
    await triggerEvent(target, 'mouseenter');
    const tooltip = findTooltip();
    assert.equal(
      tooltip.parentElement,
      expectedContainer,
      'The element identified by the popperContainer attribute should be the tooltip parent'
    );
  });
});
