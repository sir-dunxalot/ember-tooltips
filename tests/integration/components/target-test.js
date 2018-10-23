import $ from 'jquery';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  findTooltip,
  findTooltipTarget,
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
    const [ target ] = findTooltipTarget();

    assert.ok(expectedTarget.hasClass('ember-tooltip-target'),
        '#some-target should be the tooltip target');

    assert.equal(expectedTarget[0], target,
      'The element with ID equal to targetID should be the tooltip target');

    await triggerEvent(target, 'mouseenter');

    const tooltip = findTooltip();
    const targetDescribedby = $(target).attr('aria-describedby');

    assert.ok(!!targetDescribedby,
      'The target should have an aria-describedby attribute after the tooltip renders');

    assert.equal(targetDescribedby, tooltip.attr('id'),
      `The tooltip ID should match the target's aria-describedby attribute`);

  });
});
