import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';
import $ from 'jquery';

module('Integration | Option | API', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: click target, click hide-action', async function(assert) {

    assert.expect(3);

    await render(hbs`
      {{#ember-popover event='click' popoverHideDelay=0 as |popover|}}
        <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      $('.hide-action').click();

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      }, 50);
    });
  });

  test('Popover: click target, click hide-action, click target', async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#ember-popover event='click' as |popover|}}
        <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      $('.hide-action').click();

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);

        triggerTooltipTargetEvent(this.$(), 'click');

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);
        });
      }, 300);
    });
  });

  test('Popover: click target, click popover, click hide-action, click target', async function(assert) {

    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='click' popoverHideDelay=0 as |popover|}}
        <span class='hide-action' {{action 'hide' target=popover}}>Hide</span>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'click', {
        selector: '.ember-popover',
      });

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);

        $('.hide-action').click();

        afterTooltipRenderChange(assert, () => {
          assertTooltipNotVisible(assert);

          triggerTooltipTargetEvent(this.$(), 'click');

          afterTooltipRenderChange(assert, () => {
            assertTooltipVisible(assert);
          });
        }, 50);
      });
    });
  });
});
