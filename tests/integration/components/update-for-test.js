import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipContent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | updateFor', function(hooks) {
  setupRenderingTest(hooks);

  test('updateFor test', async function(assert) {

    assert.expect(2);

    this.set('asyncContent', null);

    await render(hbs`
      {{#ember-tooltip updateFor=asyncContent isShown=true}}
        {{#if asyncContent}}
          {{asyncContent}}
        {{else}}
          ...
        {{/if}}
      {{/ember-tooltip}}
    `);

    afterTooltipRenderChange(assert, () => {

      assertTooltipContent(assert, {
        contentString: '...',
      });

      afterTooltipRenderChange(assert, () => {

        /* After 200ms, change the async content */

        this.set('asyncContent', 'Some model');

        afterTooltipRenderChange(assert, () => {
          assertTooltipContent(assert, {
            contentString: 'Some model',
          });
        });
      }, 200);
    });
  });
});
