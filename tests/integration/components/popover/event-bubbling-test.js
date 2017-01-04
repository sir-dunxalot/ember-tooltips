import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, assertTooltipRendered, triggerTooltipTargetEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | Event bubbling', {
  integration: true,
});

/* This module tests whether actions not related to popovers
can be bubbled from inside the popover. Read more here:

https://github.com/sir-dunxalot/ember-tooltips/issues/141
https://github.com/sir-dunxalot/ember-tooltips/issues/157
*/

test('Popover: bubble click event', function(assert) {
  const done = assert.async();

  assert.expect(5);

  this.on('click', function() {
    console.debug('button clicked!');
    assert.ok(true, 'the eventhandler is fired');
  });

  const testComp = true;

  if (testComp) {
    this.render(hbs`
      {{#some-component}}
        {{#popover-on-component}}
          <button class="my-button" {{action 'click'}}>test button</button>
        {{/popover-on-component}}
      {{/some-component}}
    `);
  } else {
    this.render(hbs`
      {{#some-component}}
        <button class="my-button" {{action 'click'}}>test button</button>
      {{/some-component}}
    `);
  }

  let $target = $('.some-component');

  assertTooltipNotVisible(assert);
  triggerTooltipTargetEvent($target, 'mouseenter');
  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  let $button = $('.my-button');

  console.log($('#ember-testing'));

  $button.on('click', () => {
    console.log('clicked');
  });

  assert.equal($button.length, 1, 'the button can be found');
  $button.trigger('click');

  Ember.run.later(() => {
    done();
  }, 500);

});
