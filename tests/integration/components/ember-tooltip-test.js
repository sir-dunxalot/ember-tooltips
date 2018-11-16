import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipContent,
  assertTooltipRendered,
  assertTooltipNotRendered,
  findTooltipTarget,
} from 'ember-tooltips/test-support';

module('Integration | Component | ember-tooltip', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders', async function(assert) {

    assert.expect(3);

    await render(hbs`
      {{#ember-tooltip}}
        template block text
      {{/ember-tooltip}}
    `);

    assertTooltipNotRendered(assert);

    await triggerEvent(this.element, 'mouseenter');

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });
  });

  test('ember-tooltip renders many tooltips', async function(assert) {

    assert.expect(64);

    const itemsList = [...new Uint8Array(32)].map((i) => {
      const num = i + 1;
      return {
        num,
        className: `js-tooltip-${num}`,
        text: `tooltip #${num}`
      };
    })

    this.set('itemsList', itemsList);

    await render(hbs`
      {{#each itemsList as |item|}}
          <div>
            label {{item.num}}
            {{#ember-tooltip isShown=true class=item.className}}
              {{item.text}}
            {{/ember-tooltip}}
          </div>
      {{/each}}
    `);

    for (const item of itemsList) {
      assertTooltipRendered(assert, {
        selector: `.${item.className}`
      });

      assertTooltipContent(assert, {
        selector: `.${item.className}`,
        contentString: item.text,
      });
    }
  });

  test('ember-tooltip has the proper aria-describedby tag', async function(assert) {

    assert.expect(2);

    await render(hbs`
      <div class="target">
        Hover here!

        {{#ember-tooltip}}
          Some info in a tooltip.
        {{/ember-tooltip}}
      </div>
    `);

    await triggerEvent('.target', 'mouseenter');

    const $tooltipTarget = findTooltipTarget();
    const describedBy = $tooltipTarget.attr('aria-describedby');

    /* Whatever the target is 'described by' should be a tooltip with our expected content from the template above */

    assertTooltipContent(assert, {
      selector: `#${describedBy}`,
      contentString: 'Some info in a tooltip.',
    });

    assert.equal(describedBy.indexOf('#'), '-1');
  });
});
