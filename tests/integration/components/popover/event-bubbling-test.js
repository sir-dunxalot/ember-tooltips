import { moduleForComponent, test } from 'ember-qunit';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  assertTooltipRendered,
  triggerTooltipTargetEvent,
} from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | Event bubbling', {
  integration: true,
});

/* This module tests whether actions not related to popovers
can be bubbled from inside the popover. Read more here:

https://github.com/sir-dunxalot/ember-tooltips/issues/141
https://github.com/sir-dunxalot/ember-tooltips/issues/157

We put a button in the popover that is expected to send
an action to the test's context when the button is clicked.
The test will pass when the action sent from inside the
popover is captured by the context of the test.
*/

test('Popover: bubble click event', function(assert) {

  assert.expect(4);

  this.on('testaction', function() {

    /* the testaction action is fired when the
    button is clicked */

    assert.ok(true,
      'The eventhandler should be fired');

  });

  this.render(hbs`
    {{#some-component class='ember-tooltip-or-popover-target-short-circuit'}}
      {{#popover-on-component}}
        <button class="test-button-with-action" {{action 'testaction'}}>test button</button>
      {{/popover-on-component}}
    {{/some-component}}
  `);

  const $button = $('.test-button-with-action');
  const $target = $('.some-component');

  assertTooltipNotVisible(assert);
  triggerTooltipTargetEvent($target, 'mouseenter');
  assertTooltipRendered(assert);

  assert.equal($button.length, 1, 'the button can be found');

  /* Click the button to fire testaction. This will
  call the final assertion and the test will end. */

  $button.trigger('click');

});
