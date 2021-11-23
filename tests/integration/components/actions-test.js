import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';

module('Integration | Option | actions', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('ember-tooltip calls lifecycle actions', async function (assert) {
    assert.expect(10);

    const actionsCalledHash = {
      onRenderFoo: 0,
      onShowBar: 0,
      onHideBaz: 0,
      onDestroyFubar: 0,
    };

    /* Setup the actions and handlers... */

    Object.keys(actionsCalledHash).forEach((action) => {
      this.set(action, () => {
        assert.ok(true, `Should call ${action}`);

        /* Count the calls... */

        actionsCalledHash[action]++;
      });
    });

    /* Now, let's go through the component lifecycle */

    await render(hbs`
      {{#unless this.destroyTooltip}}
        {{ember-tooltip
          onRender=(action this.onRenderFoo)
          onShow=(action this.onShowBar)
          onHide=(action this.onHideBaz)
          onDestroy=(action this.onDestroyFubar)
        }}
      {{/unless}}
    `);

    const { element } = this;

    assert.equal(
      actionsCalledHash.onRenderFoo,
      0,
      'Should not have called render'
    );

    /* Check render */

    await triggerEvent(element, 'mouseenter');

    assert.equal(actionsCalledHash.onRenderFoo, 1, 'Should have called render');

    /* Check show */

    assert.equal(actionsCalledHash.onShowBar, 1, 'Should have called show');

    assert.equal(actionsCalledHash.onHideBaz, 0, 'Should not have called hide');

    await triggerEvent(element, 'mouseleave');

    assert.equal(actionsCalledHash.onHideBaz, 1, 'Should have called hide');

    /* Check destroy */

    this.set('destroyTooltip', true);

    assert.equal(
      actionsCalledHash.onDestroyFubar,
      1,
      'Should have called destroy'
    );
  });

  test('ember-tooltip supports lifecycle closure actions with multiple arguments', async function (assert) {
    /* Closure actions allow you to pass multiple parameters
    when you declare the action variable. This test covers that case.
    */

    assert.expect(1);

    let onRenderPassword;

    this.onRenderFoo = (trickPassword, realPassword) => {
      onRenderPassword = realPassword;
    };

    await render(hbs`
      {{ember-tooltip
        onRender=(action this.onRenderFoo 'trick password' 'real password')
      }}
    `);

    const { element } = this;

    await triggerEvent(element, 'mouseenter');

    assert.equal(
      onRenderPassword,
      'real password',
      'tooltip should support closure actions with multiple arguments'
    );
  });
});
