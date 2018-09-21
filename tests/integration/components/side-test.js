import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipSide,
} from 'ember-tooltips/test-support';

module('Integration | Option | side', function(hooks) {
  setupRenderingTest(hooks);

  /* Test the positions without forcing the tooltip
  to stay in the window.

  It's necessary to use effect='none' because the `effect` class causes
  spacing to be incorrect. The default 'fade' effect moves about `10px`
  closer to the target prior to the tooltip being animated when the
  tooltip is shown.
  */

  test('ember-tooltip shows on the top by default', async function(assert) {
    assert.expect(1);

    await render(hbs`{{#some-component}}Hello{{ember-tooltip isShown=true text='Hi'}}{{/some-component}}`);

    assertTooltipSide(assert, { side: 'top' });
  });

  test('ember-tooltip shows on the top', async function(assert) {
    assert.expect(1);

    await render(hbs`{{#some-component}}Hello{{ember-tooltip side='top' isShown=true text='Hi'}}{{/some-component}}`);

    assertTooltipSide(assert, { side: 'top' });
  });

  test('ember-tooltip shows on the right', async function(assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='right' isShown=true text='Hi'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'right' });
  });

  test('ember-tooltip shows on the bottom', async function(assert) {
    assert.expect(1);

    await render(
      hbs`{{#some-component}}Hello{{ember-tooltip side='bottom' isShown=true text='Hi'}}{{/some-component}}`
    );

    assertTooltipSide(assert, { side: 'bottom' });
  });

  test('ember-tooltip shows on the left', async function(assert) {
    assert.expect(1);

    await render(hbs`{{#some-component}}Hello{{ember-tooltip side='left' isShown=true text='Hi'}}{{/some-component}}`);

    assertTooltipSide(assert, { side: 'left' });
  });
});
