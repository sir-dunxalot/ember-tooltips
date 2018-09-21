import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipRendered,
  assertTooltipContent,
} from 'ember-tooltips/test-support';

module('Integration | Component | inline', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders with text param', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{ember-tooltip text='Here is more info' isShown=true}}
    `);

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });
  });
});
