import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Component | tooltip on element', function (hooks) {
  setupRenderingTest(hooks);

  ['slide', 'fade', 'none'].forEach((effect) => {
    test(`ember-tooltip effect=${effect} class test`, async function (assert) {
      assert.expect(1);

      this.set('effect', effect);

      await render(
        hbs`<EmberTooltip @effect={{this.effect}} @isShown={{true}} />`
      );

      const tooltip = findTooltip();

      assert
        .dom(tooltip)
        .hasClass(
          `ember-tooltip-effect-${effect}`,
          `the tooltip should have the ${effect} effect class`
        );
    });
  });
});
