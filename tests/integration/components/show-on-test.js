import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | showOn', {
  integration: true
});

test('It shows with showOn', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-component showOn='click'}}`);

  assertHide(assert, this);

  /* Check hover doesn't trigger tooltip */

  run(() => {
    this.$().trigger('mouseover');
  });

  assertHide(assert, this);

  /* Check click does trigger tooltip */

  run(() => {
    this.$().trigger('click');
  });

  assertShow(assert, this);

});
