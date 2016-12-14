import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerTooltipTargetEvent, assertTooltipNotRendered } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | actions', {
  integration: true
});

test('tooltip-on-element calls lifecycle actions', function(assert) {

  assert.expect(10);

  const actionsCalledHash = {
    onRenderFoo: 0,
    onShowBar: 0,
    onHideBaz: 0,
    onDestroyFubar: 0,
  };

  /* Setup the actions and handlers... */

  Object.keys(actionsCalledHash).forEach((action) => {
    this.on(action, () => {
      assert.ok(true, `Should call ${action}`);

      /* Count the calls... */

      actionsCalledHash[action]++;
    });
  });

  /* Now, let's go through the component lifecycle */

  this.render(hbs`
    {{#unless destroyTooltip}}
      {{tooltip-on-element
        onRender='onRenderFoo'
        onShow='onShowBar'
        onHide='onHideBaz'
        onDestroy='onDestroyFubar'
      }}
    {{/unless}}
  `);

  /* Check render */

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  assert.equal(actionsCalledHash.onRenderFoo, 1,
    'Should have called render');

  /* Check show */

  assert.equal(actionsCalledHash.onShowBar, 1,
    'Should have called show');

  assert.equal(actionsCalledHash.onHideBaz, 0,
    'Should not have called hide');

  triggerTooltipTargetEvent(this.$(), 'mouseleave');

  assert.equal(actionsCalledHash.onHideBaz, 1,
    'Should have called hide');

  /* Check destroy */

  this.set('destroyTooltip', true);

  assert.equal(actionsCalledHash.onDestroyFubar, 1,
    'Should have called destroy');

});


test('tooltip-on-element supports lifecycle closure actions with multiple arguments', function(assert) {
  // closure actions allow you to pass multiple parameters
  // when you declare the action variable. This test covers that case.

  assert.expect(1);

  let onRenderPassword;

  this.on('onRenderFoo', (trickPassword, realPassword) => {
    onRenderPassword = realPassword;
  });

  this.render(hbs`
    {{tooltip-on-element
      onRender=(action 'onRenderFoo' 'trick password' 'real password')
    }}
  `);

  triggerTooltipEvent(this.$(), 'mouseenter');

  assert.equal(onRenderPassword, 'real password',
    'tooltip should support closure actions with multiple arguments');

});
