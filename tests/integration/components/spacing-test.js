import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { assertTooltipSpacing } from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | spacing', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip shows with spacing=default', async function (assert) {
    assert.expect(1);

    /* Check the default spacing */

    await render(hbs`
      {{#some-component}}
        {{ember-tooltip isShown=true}}
      {{/some-component}}
    `);

    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 10,
    });
  });

  test('ember-tooltip shows with spacing=20', async function (assert) {
    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`
      {{#some-component}}
        {{ember-tooltip spacing=20 isShown=true}}
      {{/some-component}}
    `);

    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 20,
    });
  });

  test('ember-tooltip shows with spacing=20 and side=right', async function (assert) {
    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`
      {{#some-component}}
        {{ember-tooltip
          isShown=true
          spacing=20
          side='right'
        }}
      {{/some-component}}
    `);

    assertTooltipSpacing(assert, {
      side: 'right',
      spacing: 20,
    });
  });

  test('ember-tooltip shows with spacing=53 and side=bottom', async function (assert) {
    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`
      {{#some-component}}
        {{ember-tooltip
          isShown=true
          spacing=53
          side='bottom'
        }}
      {{/some-component}}
    `);

    assertTooltipSpacing(assert, {
      side: 'bottom',
      spacing: 53,
    });
  });

  test('ember-tooltip supports position variants', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{#some-component}}
        {{#ember-tooltip
          side='right-start'
          isShown=true
          spacing=35
          effect='none'}}
          Hello<br />
          Test Test<br />
          Breaker<br />
          Nine Nine Charlie<br />
          Foxtrot<br />
        {{/ember-tooltip}}
      {{/some-component}}
    `);

    assertTooltipSpacing(assert, {
      side: 'right',
      spacing: 35,
    });
  });
});
