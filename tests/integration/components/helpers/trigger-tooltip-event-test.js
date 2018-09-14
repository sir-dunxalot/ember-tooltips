import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Helpers | triggerTooltipTargetEvent', function(hooks) {
  setupRenderingTest(hooks);

  test('triggerTooltipTargetEvent throws appropriate error', async function(assert) {

    await render(hbs``);

    let funcToError = () => {
      triggerTooltipTargetEvent(this.$(), 'invalid event type');
    };

    assert.throws(funcToError, Error,
        'triggerTooltipTargetEvent should throw an error with an invalid type');

  });
});

