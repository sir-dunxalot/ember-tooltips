import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipContent,
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';
import { findTooltipTarget } from 'ember-tooltips/test-support/dom';

module('Integration | Component | title', function (hooks) {
  setupRenderingTest(hooks);

  test(`ember-tooltip uses text instead of parent's title attribute`, async function (assert) {
    assert.expect(5);

    await render(hbs`
      <div title="Hover for more info">
        {{ember-tooltip text='Here is more info'}}
      </div>
    `);

    const target = findTooltipTarget();

    await triggerEvent(target, 'mouseenter');

    assertTooltipVisible(assert);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });

    /* Reshow the tooltip and check it's content is still correct */

    await triggerEvent(target, 'mouseleave');

    assertTooltipNotVisible(assert);

    await triggerEvent(target, 'mouseenter');

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });

    assert.equal(
      target.title,
      'Hover for more info',
      'The target should have the original title'
    );
  });
});
