import {
  currentURL,
  settled,
  triggerEvent,
  visit
} from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

module('Acceptance | many-tooltips', function(hooks) {
  setupApplicationTest(hooks);

  test('does not raise infinite render invalidation errors when destroying many tooltips', async function(assert) {
    assert.expect(63);

    await visit('/many-tooltips');
    assert.equal(currentURL(), '/many-tooltips');

    assertTooltipNotRendered(assert);

    const tooltips = new Uint8Array(15).reduce((acc, _, i) => {
      acc.push(`.tooltip-${i + 1}`);
      return acc;
    }, []);

    for (const tooltip of tooltips) {
      const $tooltipTarget = $(`${tooltip}-target`);
      const [ tooltipTarget ] = $tooltipTarget;
      const tooltipOptions = {
        selector: tooltip,
      };

      assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');
      assertTooltipNotRendered(assert, tooltipOptions);
      await triggerEvent(tooltipTarget, 'mouseenter')
      assertTooltipRendered(assert, tooltipOptions);
      assertTooltipVisible(assert, tooltipOptions);
    }

    await settled();
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
