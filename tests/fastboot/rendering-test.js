import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | rendering test', function (hooks) {
  setup(hooks);

  test('it renders a page...', async function (assert) {
    await visit('/');

    assert.dom('h1').hasText('Ember Tooltips');
    assert.dom('.test-basic-component-example').hasText('Here is the info!');
    assert.dom('.test-popover-example h3').hasText('More info');
  });
});
