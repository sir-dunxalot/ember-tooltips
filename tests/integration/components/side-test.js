import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { assertTooltipSide } from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | side', function (hooks) {
  setupRenderingTest(hooks);

  /* Test the positions without forcing the tooltip
  to stay in the window.

  It's necessary to use effect='none' because the `effect` class causes
  spacing to be incorrect. The default 'fade' effect moves about `10px`
  closer to the target prior to the tooltip being animated when the
  tooltip is shown.
  */

  test('ember-tooltip shows on the top by default', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'top' });
  });

  test('ember-tooltip shows on the top', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='top' isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'top' });
  });

  test('ember-tooltip shows on the right', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='right' isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'right' });
  });

  test('ember-tooltip shows on the bottom', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='bottom' isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'bottom' });
  });

  test('ember-tooltip shows on the left', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='left' isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'left' });
  });

  test('assertTooltipSide supports a targetSelector option', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <div class="target-a">
        {{ember-tooltip class="common-tooltip" side='top' isShown=true text='Hi' effect='none'}}
      </div>
      <div class="target-b">
        {{ember-tooltip class="common-tooltip" side='left' isShown=true text='Bye' effect='none'}}
      </div>
    `);

    assertTooltipSide(assert, {
      side: 'left',
      selector: '.common-tooltip',
      targetSelector: '.target-b',
    });
  });

  test('ember-tooltip supports position variants', async function (assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='left-start' isShown=true text='Hi' effect='none'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'left' });
  });
});
