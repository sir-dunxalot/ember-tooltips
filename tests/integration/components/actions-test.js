import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | actions', {
  integration: true
});

test('It calls lifecycle actions', function(assert) {
  const actionsCalledHash = {
    onDestroy: 0,
    onHide: 0,
    onRender: 0,
    onShow: 0,
  };

  assert.expect(10);

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
      {{tooltip-on-component
        onDestroy='onDestroy'
        onHide='onHide'
        onRender='onRender'
        onShow='onShow'
      }}
    {{/unless}}
  `);

  /* Check render */

  assert.equal(actionsCalledHash.onRender, 1,
    'Should have called render');

  assert.equal(actionsCalledHash.onShow, 0,
    'Should not have called show');

  /* Check show */

  run(() => {
    this.$().trigger('mouseover');
  });

  assert.equal(actionsCalledHash.onShow, 1,
    'Should have called show');

  assert.equal(actionsCalledHash.onHide, 0,
    'Should not have called hide');

  run(() => {
    this.$().trigger('mouseleave');
  });

  assert.equal(actionsCalledHash.onHide, 1,
    'Should have called hide');

  /* Check destroy */

  this.set('destroyTooltip', true);

  assert.equal(actionsCalledHash.onDestroy, 1,
    'Should have called destroy');

});
