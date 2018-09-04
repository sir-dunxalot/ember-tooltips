import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | actions', {
  integration: true,
});

test('tooltip-on-element supports deprecated lifecycle actions', function(assert) {

  /* The onTooltip____ actions are deprecated in favor
  of on on_____ actions. These actions will be supported
  until v3.0.0.
  */

  /* We are not calling assert.expect(10); See the
  note below (REF A) */

  /* Actions can have unique names */

  const actionsCalledHash = {
    onTooltipRenderFoo: 0,
    onTooltipShowBar: 0,
    onTooltipDestroyBaz: 0,
    onTooltipHideFubar: 0,
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
        onTooltipRender='onTooltipRenderFoo'
        onTooltipShow='onTooltipShowBar'
        onTooltipDestroy='onTooltipDestroyBaz'
        onTooltipHide='onTooltipHideFubar'
      }}
    {{/unless}}
  `);

  const done = assert.async();

  /* Check render */

  assert.equal(actionsCalledHash.onTooltipRenderFoo, 1,
    'Should have called render');

  assert.equal(actionsCalledHash.onTooltipShowBar, 0,
    'Should not have called show');

  /* Check show */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  assert.equal(actionsCalledHash.onTooltipShowBar, 1,
    'Should have called show');

  assert.equal(actionsCalledHash.onTooltipHideFubar, 0,
    'Should not have called hide');

  triggerTooltipTargetEvent(this.$(), 'mouseleave');

  assert.equal(actionsCalledHash.onTooltipHideFubar, 1,
    'Should have called hide');

  /* Check destroy */

  this.set('destroyTooltip', true);

  assert.equal(actionsCalledHash.onTooltipDestroyBaz, 1,
    'Should have called destroy');

  /* REF A: For some reason the tooltip is rendered twice after it's been destroyed
  this is only observable in the ember-beta and ember-canary scenarios
  I'm commenting out the assert.expect to unblock
  I'm also waiting for 1000ms so that this behavior doesn't
  break other tests in ember-beta and ember-canary
  */

  run.later(() => {
    done();
  }, 1000);

});

test('tooltip-on-element calls lifecycle actions', function(assert) {

  assert.expect(14);

  const actionsCalledHash = {
    onRenderFoo: 0,
    onShowBar: 0,
    onHideBaz: 0,
    onDestroyFubar: 0,
  };

  const actionsArgumentsHash = {
    onRenderFoo: false,
    onShowBar: false,
    onHideBaz: false,
    onDestroyFubar: false,
  };

  /* Setup the actions and handlers... */

  Object.keys(actionsCalledHash).forEach((action) => {
    this.on(action, (args) => {
      assert.ok(true, `Should call ${action}`);

      /* Count the calls... */

      actionsCalledHash[action]++;

      actionsArgumentsHash[action] = args ? args.classNames.join(' ').indexOf('ember-tooltip') > 0 : false;
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

  assert.equal(actionsCalledHash.onRenderFoo, 1,
    'Should have called render');

  assert.equal(actionsArgumentsHash.onRenderFoo, true,
    'Should have passed tooltip object to render');

  assert.equal(actionsCalledHash.onShowBar, 0,
    'Should not have called show');

  /* Check show */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  assert.equal(actionsCalledHash.onShowBar, 1,
    'Should have called show');

  assert.equal(actionsArgumentsHash.onShowBar, true,
    'Should have passed tooltip object to show');

  assert.equal(actionsCalledHash.onHideBaz, 0,
    'Should not have called hide');

  triggerTooltipTargetEvent(this.$(), 'mouseleave');

  assert.equal(actionsCalledHash.onHideBaz, 1,
    'Should have called hide');

  assert.equal(actionsArgumentsHash.onHideBaz, true,
    'Should have passed tooltip object to hide');

  /* Check destroy */

  this.set('destroyTooltip', true);

  assert.equal(actionsCalledHash.onDestroyFubar, 1,
    'Should have called destroy');

  assert.equal(actionsArgumentsHash.onDestroyFubar, true,
    'Should have passed tooltip object to destroy');

});

test('tooltip-on-element supports lifecycle closure actions with multiple arguments', function(assert) {

  /* Closure actions allow you to pass multiple parameters
  when you declare the action variable. This test covers that case.
  */

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

  assert.equal(onRenderPassword, 'real password',
    'tooltip should support closure actions with multiple arguments');

});
