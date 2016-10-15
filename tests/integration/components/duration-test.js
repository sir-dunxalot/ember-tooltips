import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | duration', {
  integration: true
});

test('It hides after the given duration', function(assert) {
  const done = assert.async();

  assert.expect(6);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  assertHide(assert, this);

  /* Check the tooltip is hidden after the duration */

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 500);

});

test('It hides before the given duration, if requested', function(assert) {

  assert.expect(6);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  assertHide(assert, this);

});

test('It uses duration after the first show', function(assert) {
  const done = assert.async();

  assert.expect(10);

  this.render(hbs`{{tooltip-on-element duration=300}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  assertHide(assert, this);

  /* Check the tooltip is hidden after the duration */

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 500);

});
