import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  findTooltip,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Config | body-element-id', function(hooks) {
  setupRenderingTest(hooks);

  test('Tooltip is rendered on rootElement not body', async function(assert) {

    assert.expect(2);

    await render(hbs`{{ember-tooltip isShown=true}}`);

    afterTooltipRenderChange(assert, () => {
      const $tooltip = findTooltip();
      const $tooltipParent = $tooltip.parent();
      const tooltipParentId = $tooltipParent.attr('id');

      assert.notEqual($tooltipParent.attr('tagname'), 'body',
        'The tooltip should not be a child of the document body');

      assert.equal(tooltipParentId, 'ember-testing',
        'The tooltip should be a child of the #ember-testing rootElement');
    });
  });
});
