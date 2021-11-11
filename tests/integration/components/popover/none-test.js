import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Option | event', function (hooks) {
  setupRenderingTest(hooks);

  test('Popover: never shows automatically with none', async function (assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='none'}}`);

    const popoverTarget = this.element;

    assertTooltipNotRendered(assert);

    /* Check focus */

    await triggerEvent(popoverTarget, 'focus');

    assertTooltipNotRendered(assert);

    /* Check hover */

    await triggerEvent(popoverTarget, 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click */

    await triggerEvent(popoverTarget, 'click');

    assertTooltipNotRendered(assert);
  });

  test("Popover: doesn't hide automatically with none w/ focus events", async function (assert) {
    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='none' popoverHideDelay=0 isShown=this.isShown}}
        <a href class="popover-interior"></a>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    this.set('isShown', true);
    await settled();

    const popover = findTooltip();
    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focus');
    assertTooltipVisible(assert);

    await triggerEvent(popover.querySelector('.popover-interior'), 'focus');
    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focusout');
    assertTooltipVisible(assert);
  });

  test("Popover: doesn't hide automatically with none w/ mouse events", async function (assert) {
    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='none' popoverHideDelay=0 isShown=this.isShown}}
        <a href class="popover-interior"></a>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    this.set('isShown', true);
    await settled();

    const popover = findTooltip();
    assertTooltipVisible(assert);

    await triggerEvent(popover, 'mouseenter');
    assertTooltipVisible(assert);

    await triggerEvent(
      popover.querySelector('.popover-interior'),
      'mouseenter'
    );
    assertTooltipVisible(assert);

    await triggerEvent(popover, 'mouseleave');
    assertTooltipVisible(assert);
  });
});
