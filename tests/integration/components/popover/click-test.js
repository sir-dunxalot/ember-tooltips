import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipVisible,
  triggerTooltipTargetEvent,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
} from 'ember-tooltips/test-support';

module('Integration | Option | click', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: click target, click target', async function(assert) {
    assert.expect(3);

    await render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent(this.$(), 'click');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click popover, click target', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

    const $popoverTarget = this.$();

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.ember-popover' });

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target, click elsewhere', async function(assert) {
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

  test('Popover: click target, click popover, click elsewhere', async function(assert) {

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

    await triggerEvent('.ember-popover', 'mouseenter');

    await click('.ember-popover');

    assertTooltipVisible(assert);

    /* Mimic user's cursor leaving popover and clicking away from it */

    await triggerEvent('.ember-popover', 'mouseleave');

    await click('.elsewhere');

    assertTooltipNotVisible(assert);
  });

  test('Popover: click target-interior, click target-interior', async function(assert) {
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

  test('Popover: focusin/click input, click input', async function(assert) {
    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-popover event='click' targetId='some-input' popoverHideDelay=0}}
    `);

    const $popoverTarget = this.$('#some-input');

    assertTooltipNotRendered(assert);

    /* We intentionally trigger a focusin and click on the $popoverTarget because
    when a user clicks an input both events occur in that order.
    We have fixed this with _isInProcessOfShowing and this test protects that. */

    await triggerTooltipTargetEvent($popoverTarget, 'focusin');
    await triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    await triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipNotVisible(assert);
  });
});
