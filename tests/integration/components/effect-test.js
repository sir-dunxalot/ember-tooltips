import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  findTooltip,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Component | tooltip on element', function(hooks) {
  setupRenderingTest(hooks);

  ['slide', 'fade', 'none'].forEach((effect) => {
    test(`ember-tooltip effect=${effect} class test`, async function(assert) {

      assert.expect(1);

      this.set('effect', effect);

      await render(hbs`{{ember-tooltip effect=effect isShown=true}}`);

      const $tooltip = findTooltip();

      assert.ok($tooltip.hasClass(`ember-tooltip-effect-${effect}`),
        `the tooltip should have the ${effect} effect class`);

    });
  });
});
