import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | updateFor', function (hooks) {
  setupRenderingTest(hooks);

  test('updateFor test', async function (assert) {
    assert.expect(2);

    this.set('asyncContent', null);

    await render(hbs`
      <EmberTooltip @updateFor={{this.asyncContent}} @isShown={{true}}>
        {{#if this.asyncContent}}
          {{this.asyncContent}}
        {{else}}
          ...
        {{/if}}
      </EmberTooltip>
    `);

    assertTooltipContent(assert, {
      contentString: '...',
    });

    /* After 200ms, change the async content */

    this.set('asyncContent', 'Some model');

    await settled();

    assertTooltipContent(assert, {
      contentString: 'Some model',
    });
  });
});
