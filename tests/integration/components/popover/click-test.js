import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerEvent, find } from '@ember/test-helpers';
import {
  assertTooltipVisible,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Option | click', function (hooks) {
  setupRenderingTest(hooks);

  test('Popover: click target, click target', async function (assert) {
    assert.expect(3);

    await render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await click(element);

    assertTooltipVisible(assert);

    await click(element);

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click popover, click target', async function (assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

    const { element } = this;

    assertTooltipNotRendered(assert);

    await triggerEvent(element, 'click');

    assertTooltipVisible(assert);

    const popover = findTooltip();
    await triggerEvent(popover, 'click');

    assertTooltipVisible(assert);

    await triggerEvent(element, 'click');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click elsewhere', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <div class="elsewhere">
        <div class="target">
          {{ember-popover event='click' popoverHideDelay=0}}
        </div>
      </div>
    `);

    assertTooltipNotRendered(assert);

    await click('.target');

    assertTooltipVisible(assert);

    await click('.elsewhere');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click popover, click elsewhere', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div class="elsewhere">
        <div class="target">
          {{ember-popover event='click' popoverHideDelay=0}}
        </div>
      </div>
    `);

    assertTooltipNotRendered(assert);

    await click('.target');

    assertTooltipVisible(assert);

    /* Mimic user's cursor entering popover and clicking it */
    const popover = findTooltip();
    await triggerEvent(popover, 'mouseenter');

    await click(popover);

    assertTooltipVisible(assert);

    /* Mimic user's cursor leaving popover and clicking away from it */

    await triggerEvent(popover, 'mouseleave');

    await click('.elsewhere');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target-interior, click target-interior', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <p class='target-interior'></p>
      {{ember-popover event='click' popoverHideDelay=0}}
    `);

    assertTooltipNotRendered(assert);

    await click('.target-interior');

    assertTooltipVisible(assert);

    await click('.target-interior');

    assertTooltipNotVisible(assert);
  });

  test('Popover: focusin/click input, click input', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-popover event='click' targetId='some-input' popoverHideDelay=0}}
    `);

    const popoverTarget = find('#some-input');

    assertTooltipNotRendered(assert);

    /* We intentionally trigger a focusin and click on the $popoverTarget because
    when a user clicks an input both events occur in that order.
    We have fixed this with _isInProcessOfShowing and this test protects that. */

    await triggerEvent(popoverTarget, 'focusin');
    await triggerEvent(popoverTarget, 'click');

    assertTooltipVisible(assert);

    await triggerEvent(popoverTarget, 'click');

    assertTooltipNotVisible(assert);
  });

  [null, 'none'].forEach((event) => {
    test(`Popover: click target, click popover, click elsewhere (event == ${event})`, async function (assert) {
      assert.expect(5);

      this.set('showingPopover', false);
      this.set('event', event);

      this.togglePopover = () => {
        this.set('showingPopover', !this.showingPopover);
      };

      await render(hbs`
        <div class="elsewhere">
          <div class="target" onClick={{action this.togglePopover}}>
            <EmberPopover @isShown={{this.showingPopover}}
                          @event={{this.event}}
                          @popoverHideDelay={{0}} />
          </div>
        </div>
      `);

      assertTooltipNotRendered(assert);

      await click('.target');

      assertTooltipVisible(assert);

      /* Mimic user's cursor entering popover and clicking it */
      const popover = findTooltip();
      await triggerEvent(popover, 'mouseenter');

      await click(popover);

      assertTooltipVisible(assert);

      /* Mimic user's cursor leaving popover and clicking away from it */

      await triggerEvent(popover, 'mouseleave');

      await click('.elsewhere');

      assertTooltipVisible(assert);

      await click('.target');

      assertTooltipNotVisible(assert);
    });
  });
});
