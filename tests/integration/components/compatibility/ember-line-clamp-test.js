import { hbs } from 'ember-cli-htmlbars';
import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import {
  assertTooltipNotRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

// ember-line-clamp doesn't support 4.x (yet)
(macroCondition(dependencySatisfies('ember-source', '^3.0.0')) ? module : skip)(
  'Integration | Compatibility | ember-line-clamp',
  function (hooks) {
    setupRenderingTest(hooks);

    test('It renders with one tooltip', async function (assert) {
      assert.expect(2);

      await render(hbs`
      {{line-clamp text='Some text'}}
      {{ember-tooltip text='Tooltip 1'}}
    `);

      const { element } = this;

      assertTooltipNotRendered(assert);

      await triggerEvent(element, 'mouseenter');

      assertTooltipVisible(assert);
    });

    test('It renders with two tooltips', async function (assert) {
      assert.expect(3);

      await render(hbs`
      {{line-clamp text='Some text'}}

      <span class="target-1">
        Hover me 1
        {{ember-tooltip class='tooltip-1' text='This is text 1'}}
      </span>

      <span class="target-2">
        Hover me 2
        {{ember-tooltip class='tooltip-2' text='This is text 2'}}
      </span>
    `);

      assertTooltipNotRendered(assert);

      await triggerEvent('.target-1', 'mouseenter');

      assertTooltipVisible(assert, {
        selector: '.tooltip-1',
      });

      await triggerEvent('.target-2', 'mouseenter');

      assertTooltipVisible(assert, {
        selector: '.tooltip-2',
      });
    });
  }
);
