import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Option | API', function (hooks) {
  setupRenderingTest(hooks);

  test('Popover: click target, click hide-action', async function (assert) {
    assert.expect(3);

    await render(hbs`
      {{#ember-popover event='click' popoverHideDelay=0 as |popover|}}
        <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    await triggerEvent(this.element, 'click');

    assertTooltipVisible(assert);

    const popover = findTooltip();
    await click(popover.querySelector('.hide-action'));

    // await settled();

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click hide-action, click target', async function (assert) {
    assert.expect(4);

    await render(hbs`
      {{#ember-popover event='click' as |popover|}}
        <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
      {{/ember-popover}}
    `);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await click(element);

    assertTooltipVisible(assert);

    const popover = findTooltip();
    await click(popover.querySelector('.hide-action'));
    await triggerEvent(element, 'mouseleave');

    assertTooltipNotVisible(assert);

    await settled();

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);
  });

  test('Popover: click target, click popover, click hide-action, click target', async function (assert) {
    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='click' as |popover|}}
        <span class='hide-action' {{action 'hide' target=popover}}>Hide</span>
      {{/ember-popover}}
    `);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);

    const popover = findTooltip();

    await click(popover);

    assertTooltipVisible(assert);

    await click(popover.querySelector('.hide-action'));

    assertTooltipNotVisible(assert);

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);
  });
});
