import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | popper-options', function(hooks) {
  setupRenderingTest(hooks);

  test('passes through popperOptions.modifiers, preserving nonoverridden defaults', async function(assert) {
    assert.expect(3);

    this.set('popperOptions', {
      modifiers: {
        flip: {
          enabled: false
        },
        offset: {
          offset: 30
        }
      }
    });

    this.set('onRender', function(component) {
      const { options } = component.get('_tooltip');
      const { popperOptions: { modifiers } } = options;

      assert.equal(
        modifiers.preventOverflow.escapeWithReference,
        true,
        "expected `preventOverflow` modifier defaults to be preserved"
      );

      assert.equal(
        modifiers.offset.offset,
        30,
        "expected `offset` modifier to be set even though we don't provide a default"
      );
      assert.equal(
        modifiers.flip.enabled,
        false,
        "expected `flip.enabled` to be overridden"
      );
    });

    await render(hbs`
      {{ember-tooltip
        isShown=true
        popperOptions=popperOptions
        onRender=(action onRender)
      }}
    `);
  });
});
