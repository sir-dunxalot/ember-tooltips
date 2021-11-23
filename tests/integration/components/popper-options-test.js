import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Option | popper-options', function (hooks) {
  setupRenderingTest(hooks);

  test('passes through popperOptions.modifiers, preserving nonoverridden defaults', async function (assert) {
    assert.expect(3);

    this.set('popperOptions', {
      modifiers: {
        flip: {
          enabled: false,
        },
        offset: {
          offset: 30,
        },
      },
    });

    this.set('onRender', function (component) {
      const { options } = component.get('_tooltip');
      const {
        popperOptions: { modifiers },
      } = options;

      assert.true(
        modifiers.preventOverflow.escapeWithReference,
        'expected `preventOverflow` modifier defaults to be preserved'
      );

      assert.equal(
        modifiers.offset.offset,
        30,
        "expected `offset` modifier to be set even though we don't provide a default"
      );
      assert.false(
        modifiers.flip.enabled,
        'expected `flip.enabled` to be overridden'
      );
    });

    await render(hbs`
      <EmberTooltip
        @isShown={{true}}
        @popperOptions={{this.popperOptions}}
        @onRender={{action this.onRender}}
      />
    `);
  });
});
