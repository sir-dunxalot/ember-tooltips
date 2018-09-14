import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotVisible,
  assertTooltipNotRendered,
  assertTooltipVisible,
  findTooltip,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

const MS_FOR_BLUR = 100;

module('Integration | Option | focus', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: target focus, popover focus, popover blur', async function(assert) {

    assert.expect(4);

    await render(hbs`{{ember-popover event='focus' popoverHideDelay=0}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'focus');

    afterTooltipRenderChange(assert, () => {
      const $popover = findTooltip();

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent($popover, 'focusin');

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);

        triggerTooltipTargetEvent($popover, 'focusout');

        afterTooltipRenderChange(assert, () => {
          assertTooltipNotVisible(assert);
        }, MS_FOR_BLUR);
      });
    }, MS_FOR_BLUR);
  });

  test('Popover: target focus, target-interior focus, popover focus, popover blur', async function(assert) {

    assert.expect(5);

    await render(hbs`
      <a href class="target-interior"></a>
      {{ember-popover event='focus' popoverHideDelay=0}}
    `);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'focus');

    afterTooltipRenderChange(assert, () => {

      const $popover = findTooltip();

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'focus', {
        selector: '.target-interior',
      });

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);

        triggerTooltipTargetEvent($popover, 'focus');

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);

          triggerTooltipTargetEvent($popover, 'focusout');

          afterTooltipRenderChange(assert, () => {
            assertTooltipNotVisible(assert);
          }, MS_FOR_BLUR);
        });
      });
    });

  });

  test('Popover: target focus, popover focus, popover-interior focus, popover blur', async function(assert) {

    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='focus' popoverHideDelay=0}}
        <a href class="popover-interior"></a>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'focus');

    afterTooltipRenderChange(assert, () => {
      const $popover = findTooltip();

      assertTooltipVisible(assert);

      triggerTooltipTargetEvent($popover, 'focus');

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);

        triggerTooltipTargetEvent(this.$(), 'focus', {
          selector: '.popover-interior',
        });

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);

          triggerTooltipTargetEvent($popover, 'focusout');

          afterTooltipRenderChange(assert, () => {
            assertTooltipNotVisible(assert);
          }, MS_FOR_BLUR);
        });
      });
    });

  });

  test('Popover: input focus, input blur', async function(assert) {

    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-popover event='focus' targetId='some-input' popoverHideDelay=0}}
    `);

    const $popoverTarget = this.$('#some-input');

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent($popoverTarget, 'focus');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      triggerTooltipTargetEvent($popoverTarget, 'blur');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      }, MS_FOR_BLUR);
    });

  });
});
