import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, find, settled } from '@ember/test-helpers';
import {
  findTooltip,
  findTooltipTarget,
} from 'ember-tooltips/test-support/dom';

module('Integration | Component | target', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip targetId test', async function (assert) {
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

  test('ember-tooltip targetElement test', async function (assert) {
    assert.expect(1);

    this.set('showTooltip', false);

    await render(hbs`
      <div id="some-target"></div>
      {{#if this.showTooltip}}
        {{ember-tooltip targetElement=this.targetElement}}
      {{/if}}
    `);

    const expectedTarget = find('#some-target');
    this.set('targetElement', expectedTarget);

    this.set('showTooltip', true);
    await settled();

    const target = findTooltipTarget();
    assert.equal(
      expectedTarget,
      target,
      'The element with ID equal to targetID should be the tooltip target'
    );
  });

  test('ember-tooltip targetId takes precedence over targetElement', async function (assert) {
    assert.expect(1);

    this.set('showTooltip', false);

    await render(hbs`
      <div id="some-target"></div>
      <div id="other-target"></div>
      {{#if this.showTooltip}}
        {{ember-tooltip targetId="some-target" targetElement=this.targetElement}}
      {{/if}}
    `);

    this.set('targetElement', find('#other-target'));
    this.set('showTooltip', true);
    await settled();

    const expectedTarget = find('#some-target');
    const target = findTooltipTarget();
    assert.equal(
      expectedTarget,
      target,
      'The element with ID equal to targetID should be the tooltip target'
    );
  });
});
