import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import {
  assertTooltipVisible,
  assertTooltipNotVisible,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Component | keydown', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip esc key triggers single hide', async function (assert) {
    assert.expect(5);

    /* Create two tooltips and hide one after another with two keydown events */

    await render(hbs`
      {{ember-tooltip isShown=true tooltipClass='test-tooltip1' text='I am here'}}
      {{ember-tooltip isShown=true tooltipClass='test-tooltip2' text='I am there'}}
    `);

    assertTooltipVisible(assert, { selector: '.test-tooltip1' });
    assertTooltipVisible(assert, { selector: '.test-tooltip2' });

    const { element } = this;
    await triggerKeyEvent(element, 'keydown', 27);

    assertTooltipNotVisible(assert, { selector: '.test-tooltip1' });
    assertTooltipVisible(assert, { selector: '.test-tooltip2' });

    await triggerKeyEvent(element, 'keydown', 27);

    assertTooltipNotVisible(assert, { selector: '.test-tooltip2' });
  });
});
