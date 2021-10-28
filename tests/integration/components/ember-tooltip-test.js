import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipContent,
  assertTooltipRendered,
  assertTooltipNotRendered,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltipTarget } from 'ember-tooltips/test-support/dom';

module('Integration | Component | ember-tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders', async function (assert) {
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

  test('ember-tooltip has the proper aria-describedby tag', async function (assert) {
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

    const tooltipTarget = findTooltipTarget();
    const describedBy = tooltipTarget.getAttribute('aria-describedby');

    /* Whatever the target is 'described by' should be a tooltip with our expected content from the template above */

    assertTooltipContent(assert, {
      selector: `#${describedBy}`,
      contentString: 'Some info in a tooltip.',
    });

    assert.equal(describedBy.indexOf('#'), '-1');
  });
});
