import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipContent,
  assertTooltipNotVisible,
  assertTooltipVisible,
  assertTooltipNotRendered,
  assertTooltipRendered,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Helpers | dom | findTooltip', function(hooks) {
  setupRenderingTest(hooks);

  [assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
    test(`findTooltip() throws an Error in when a non-tooltip is found`, async function(assert) {
      assert.expect(1);

      await render(hbs`<div class="test-tooltip"></div>`);

      let funcToError = () => {
        helperInstance(assert, {
          selector: '.test-tooltip',
        });
      };

      assert.throws(funcToError, Error,
        'helperInstance should throw an Error');

    });
  });

  test('findTooltip() can find a tooltip based on the class passed to the component', async function(assert) {
    assert.expect(1);

    await render(hbs`{{ember-tooltip text='hello' class='js-tooltip-component-element' isShown=true}}`);

    assertTooltipRendered(assert, { selector: '.js-tooltip-component-element' });
  });

  test('findTooltip() can find a tooltip based on tooltipClassName passed to the component', async function(assert) {
    assert.expect(1);

    await render(hbs`{{ember-tooltip text='hello' tooltipClassName='ember-tooltip js-class-on-the-popper-element' isShown=true}}`);

    assertTooltipRendered(assert, { selector: '.js-class-on-the-popper-element' });
  });

  test('findTooltip() will not throw en error with assertTooltipNotRendered', async function(assert) {
    assert.expect(1);

    await render(hbs``);

    assertTooltipNotRendered(assert);

  });

  test('findTooltip() can find the correct tooltip among many when given a targetSelector', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <div class="target-a">
        {{ember-tooltip class="common-tooltip" side='top' isShown=true text='Hi' effect='none'}}
      </div>
      <div class="target-b">
        {{ember-tooltip class="common-tooltip" side='left' isShown=true text='Bye' effect='none'}}
      </div>
      <div class="target-c">
        {{ember-tooltip class="common-tooltip" side='right' isShown=true text='Huh' effect='none'}}
      </div>
    `);

    assertTooltipContent(assert, {
      selector: '.common-tooltip',
      targetSelector: '.target-b',
      contentString: 'Bye'
    });

    assertTooltipContent(assert, {
      selector: '.common-tooltip',
      targetSelector: '.target-c',
      contentString: 'Huh'
    });
  });
});
