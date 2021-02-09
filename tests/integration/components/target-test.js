import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  findTooltip,
  findTooltipTarget,
} from 'ember-tooltips/test-support/dom';

module('Integration | Component | target', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip target test', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <div id="some-target"></div>
      {{ember-tooltip targetId='some-target'}}
    `);

    const expectedTarget = find('#some-target');
    const target = findTooltipTarget();

    assert
      .dom(expectedTarget)
      .hasClass(
        'ember-tooltip-target',
        '#some-target should be the tooltip target'
      );

    assert.equal(
      expectedTarget,
      target,
      'The element with ID equal to targetID should be the tooltip target'
    );

    await triggerEvent(target, 'mouseenter');

    const tooltip = findTooltip();
    const targetDescribedby = target.getAttribute('aria-describedby');

    assert.ok(
      !!targetDescribedby,
      'The target should have an aria-describedby attribute after the tooltip renders'
    );

    assert.equal(
      targetDescribedby,
      tooltip.getAttribute('id'),
      `The tooltip ID should match the target's aria-describedby attribute`
    );
  });
});
