import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from 'dummy/tests/helpers/ember-tooltips';

function testTooltipDelay(assert, template) {
  const done = assert.async();

  this.render(template);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {

    /* Check the tooltip is not rendered until the delay */

    run.later(() => {
      assertTooltipNotRendered(assert);
    }, 250);

    /* Check the tooltip is shown after the delay */

    run.later(() => {
      assertTooltipRendered(assert);
      assertTooltipVisible(assert);
    }, 320);

    /* Check the tooltip still hides immediately when it's supposed to be hidden */

    run.later(() => {
      triggerTooltipTargetEvent(this.$(), 'mouseleave');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
        done();
      });
    }, 350);
  });
}

module('Integration | Option | delay', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip animates with delay passed as a number', function(assert) {
    assert.expect(5);
    testTooltipDelay.call(this, assert, hbs`{{ember-tooltip delay=300}}`);
  });

  test('ember-tooltip animates with delay passed as a string', function(assert) {
    assert.expect(5);
    testTooltipDelay.call(this, assert, hbs`{{ember-tooltip delay='300'}}`);
  });
});
