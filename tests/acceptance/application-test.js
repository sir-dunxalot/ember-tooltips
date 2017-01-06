import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const { QUnit } = window;

let originalTimeout;

moduleForAcceptance('Acceptance | application', {

  beforeEach() {
    originalTimeout = QUnit.config.testTimeout;
    QUnit.config.testTimeout = 3000;
  },

  afterEach() {
    QUnit.config.testTimeout = originalTimeout;
  },

});

/* This test makes sure that `didUpdate()` method in
tooltip-on-element component renders the tooltip
immediately in testing mode. If it is not rendering
immediately in testing mode, the test will timeout.
*/

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
