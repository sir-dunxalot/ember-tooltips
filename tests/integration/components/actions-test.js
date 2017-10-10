import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | actions', {
  integration: true,
});

test('ember-tooltip calls lifecycle actions', function(assert) {

  assert.expect(11);

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
      {{ember-tooltip
        onRender='onRenderFoo'
        onShow='onShowBar'
        onHide='onHideBaz'
        onDestroy='onDestroyFubar'
      }}
    {{/unless}}
  `);

  assert.equal(actionsCalledHash.onRenderFoo, 0,
    'Should not have called render');

  /* Check render */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {

    assert.equal(actionsCalledHash.onRenderFoo, 1,
      'Should have called render');

    /* Check show */

    assert.equal(actionsCalledHash.onShowBar, 1,
      'Should have called show');

    assert.equal(actionsCalledHash.onHideBaz, 0,
      'Should not have called hide');

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    afterTooltipRenderChange(assert, () => {

      assert.equal(actionsCalledHash.onHideBaz, 1,
        'Should have called hide');

      /* Check destroy */

      this.set('destroyTooltip', true);

      assert.equal(actionsCalledHash.onDestroyFubar, 1,
        'Should have called destroy');

    });
  });
});

test('ember-tooltip supports lifecycle closure actions with multiple arguments', function(assert) {

  /* Closure actions allow you to pass multiple parameters
  when you declare the action variable. This test covers that case.
  */

  assert.expect(1);

  let onRenderPassword;

  this.on('onRenderFoo', (trickPassword, realPassword) => {
    onRenderPassword = realPassword;
  });

  this.render(hbs`
    {{ember-tooltip
      onRender=(action 'onRenderFoo' 'trick password' 'real password')
    }}
  `);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {

    assert.equal(onRenderPassword, 'real password',
      'tooltip should support closure actions with multiple arguments');

  });

});
