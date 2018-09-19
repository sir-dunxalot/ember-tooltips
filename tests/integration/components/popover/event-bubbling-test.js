import $ from 'jquery';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipVisible,
  assertTooltipNotRendered,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | Event bubbling', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  /* This module tests whether actions not related to popovers
  can be bubbled from inside the popover.

  This is testing the ember-tether config applied by this addon.

  https://github.com/sir-dunxalot/ember-tooltips/commit/e2e39db2868422b6c2484fe35e9951418f06d8a0#diff-168726dbe96b3ce427e7fedce31bb0bcR7

  This fixes issues like the following:

  - https://github.com/sir-dunxalot/ember-tooltips/issues/141
  - https://github.com/sir-dunxalot/ember-tooltips/issues/157

  In this test, we put a button in the popover that is expected to send
  an action to the test's context when the button is clicked.
  The test will pass when the action sent from inside the
  popover is captured by the context of the test.
  */

  test('Popover: bubble click event', async function(assert) {

    assert.expect(4);

    this.actions.testAction = function() {

      /* The testAction action is fired when the
      button is clicked */

      assert.ok(true,
        'The eventhandler should be fired');

    };

    await render(hbs`
      {{#ember-popover popoverHideDelay=0}}
        <button class="test-button-with-action" {{action 'testAction'}}>test button</button>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    await triggerTooltipTargetEvent(this.$(), 'mouseenter');

    const $button = $('.test-button-with-action');

    assertTooltipVisible(assert);

    assert.equal($button.length, 1, 'the button can be found');

    /* Click the button to fire testAction. This will
    call the final assertion and the test will end. */

    $button.trigger('click');

  });
});
