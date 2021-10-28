import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { findTooltip } from 'ember-tooltips/test-support/dom';

module('Integration | Config | body-element-id', function (hooks) {
  setupRenderingTest(hooks);

  test('Tooltip is rendered on #ember-testing-container not body', async function (assert) {
    assert.expect(2);

    await render(hbs`{{ember-tooltip isShown=true}}`);

    const tooltip = findTooltip();
    const tooltipParent = tooltip.parentElement;
    const tooltipParentId = tooltipParent.getAttribute('id');

    assert.notEqual(
      tooltipParent.tagName,
      'BODY',
      'The tooltip should not be a child of the document body'
    );

    assert.ok(
      tooltipParentId.match(/ember-testing(-container)?/),
      'The tooltip should be a child of an ember-testing container'
    );
  });
});
