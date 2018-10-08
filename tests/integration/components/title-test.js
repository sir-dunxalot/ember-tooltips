import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipRendered,
  assertTooltipContent,
  findTooltipTarget,
} from 'ember-tooltips/test-support';

module('Integration | Component | title', function(hooks) {
  setupRenderingTest(hooks);

  test(`ember-tooltip uses text instead of parent's title attribute`, async function(assert) {
    assert.expect(3);

    await render(hbs`
      <div title="Hover for more info">
        {{ember-tooltip text='Here is more info' isShown=true}}
      </div>
    `);

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });

    assert.equal(findTooltipTarget().attr('title'), 'Hover for more info',
      'The target should have the original title');
  });
});
