import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | disabled', {
  integration: true
});

test('It disables tooltip', function(assert) {

  assert.expect(6);

  this.set('disabled', true);
  this.render(hbs`{{tooltip-on-element disabled=disabled}}`);

  assertHide(assert, this);

  /* Check hover doesn't trigger tooltip if disabled */
  run(() => {
    this.$().trigger('mouseover');
  });

  assertHide(assert, this);

  /* Check hover triggers tooltip when not disabled */
  this.set('disabled', false);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

});
