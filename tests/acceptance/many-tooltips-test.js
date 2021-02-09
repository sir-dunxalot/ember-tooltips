import { currentURL, settled, triggerEvent, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Acceptance | many-tooltips', function (hooks) {
  setupApplicationTest(hooks);

  test('does not raise infinite render invalidation errors when destroying many tooltips', async function (assert) {
    assert.expect(63);

    await visit('/many-tooltips');
    assert.equal(currentURL(), '/many-tooltips');

    assertTooltipNotRendered(assert);

    const tooltips = new Uint8Array(15).reduce((acc, _, i) => {
      acc.push(`.tooltip-${i + 1}`);
      return acc;
    }, []);

    for (let i = 0; i < tooltips.length; i++) {
      const tooltip = tooltips[i];
      const tooltipTarget = document.querySelector(`${tooltip}-target`);
      const tooltipOptions = {
        selector: tooltip,
      };

      assert.ok(tooltipTarget, 'there should be one $tooltipTarget');
      assertTooltipNotRendered(assert, tooltipOptions);
      await triggerEvent(tooltipTarget, 'mouseenter');
      assertTooltipRendered(assert, tooltipOptions);
      assertTooltipVisible(assert, tooltipOptions);
    }

    await settled();
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
