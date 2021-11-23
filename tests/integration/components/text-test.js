import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import {
  assertTooltipRendered,
  assertTooltipContent,
} from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Component | inline', function (hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders with text param', async function (assert) {
    assert.expect(2);

    await render(
      hbs`<EmberTooltip @text="Here is more info" @isShown={{true}} />`
    );

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });
  });

  test('ember-tooltip updates when text param changes', async function (assert) {
    assert.expect(3);

    this.set('tooltipText', 'Here is more info');

    await render(
      hbs`<EmberTooltip @text={{this.tooltipText}} @isShown={{true}} />`
    );

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });

    this.set('tooltipText', 'Here is the latest info');
    await settled();

    assertTooltipContent(assert, {
      contentString: 'Here is the latest info',
    });
  });
});
