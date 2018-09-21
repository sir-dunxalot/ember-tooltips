import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  findTooltip,
  findTooltipTarget,
  triggerTooltipTargetEvent,
} from 'ember-tooltips/test-support';

module('Integration | Component | target', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip target test', async function(assert) {
    assert.expect(4);

    await render(hbs`
      <div id="some-target"></div>
      {{ember-tooltip targetId='some-target'}}
    `);

    const expectedTarget = this.$().find('#some-target');
    const actualTarget = findTooltipTarget();

    assert.ok(expectedTarget.hasClass('ember-tooltip-target'),
        '#some-target should be the tooltip target');

    assert.equal(expectedTarget[0], actualTarget[0],
      'The element with ID equal to targetID should be the tooltip target');

    await triggerTooltipTargetEvent(actualTarget, 'mouseenter');

    const tooltip = findTooltip();
    const targetDescribedby = actualTarget.attr('aria-describedby');

    assert.ok(!!targetDescribedby,
      'The target should have an aria-describedby attribute after the tooltip renders');

    assert.equal(targetDescribedby, tooltip.attr('id'),
      `The tooltip ID should match the target's aria-describedby attribute`);

  });
});
