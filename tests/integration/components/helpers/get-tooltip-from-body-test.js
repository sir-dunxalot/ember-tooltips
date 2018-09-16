import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  assertTooltipNotRendered,
  assertTooltipRendered,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Helpers | getTooltipFromBody', function(hooks) {
  setupRenderingTest(hooks);

  [assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
    test(`each helperInstance's getTooltipFromBody throws error when $body is not provided`, function(assert) {

      this.render(hbs`
        {{ember-tooltip}}

        {{ember-tooltip}}
      `);

      const $notBody = this.$();

      let funcToError = () => {
        helperInstance($notBody, assert);
      };

      assert.throws(funcToError, Error,
        'helperInstance without $body will throw an error');

    });
  });

  [assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
    test(`each helperInstance's getTooltipFromBody throws error when no tooltip is found`, function(assert) {

      this.render(hbs``);

      let funcToError = () => {
        helperInstance(assert);
      };

      assert.throws(funcToError, Error,
        'helperInstance without a rendered tooltip will throw an Error');

    });
  });

  [assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
    test(`each helperInstance's getTooltipFromBody throws error when multiple tooltips are found`, function(assert) {

      this.render(hbs`
        {{ember-tooltip}}

        {{ember-tooltip}}
      `);

      let funcToError = () => {
        helperInstance(assert);
      };

      assert.throws(funcToError, Error,
        'helperInstance without multiple tooltips will throw an Error');

    });
  });

  test('getTooltipFromBody will not throw en error with assertTooltipNotRendered', async function(assert) {

    await render(hbs``);

    assertTooltipNotRendered(assert);

  });
});
