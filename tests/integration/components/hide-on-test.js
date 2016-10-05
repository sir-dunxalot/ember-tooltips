import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | hideOn', {
  integration: true
});

test('It hides with hideOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element hideOn='click'}}`);

  assertHide(assert, this);

  /* Check hover triggers tooltip */

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  /* Check click hides tooltip */

  run(() => {
    this.$().trigger('click');
  });

  assertHide(assert, this);

});
