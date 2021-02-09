import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

const { QUnit } = window;

let originalTimeout;

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    originalTimeout = QUnit.config.testTimeout;
    QUnit.config.testTimeout = 3000;
  });

  hooks.afterEach(function () {
    QUnit.config.testTimeout = originalTimeout;
  });

  /* This test makes sure that `didUpdate()` method in
  ember-tooltip component renders the tooltip
  immediately in testing mode. If it is not rendering
  immediately in testing mode, the test will timeout.
  */

  test('visiting /', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
