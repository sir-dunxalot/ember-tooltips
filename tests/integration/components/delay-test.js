import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | delay', {
  integration: true
});

test('It animates with delay passed as a number', function(assert) {
  const done = assert.async();

  assert.expect(4);

  this.render(hbs`{{tooltip-on-component delay=300}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  /* Check the tooltip is shwon after the correct delay */

  run.later(() => {
    assertHide(assert, this);
  }, 290);

  run.later(() => {
    assertShow(assert, this);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    run(() => {
      this.$().trigger('mouseleave');
    });

    assertHide(assert, this);

    done();
  }, 350);

});

test('It animates with delay passed as a string', function(assert) {
  const done = assert.async();

  assert.expect(4);

  this.render(hbs`{{tooltip-on-component delay='300'}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  /* Check the tooltip is shwon after the correct delay */

  run.later(() => {
    assertHide(assert, this);
  }, 290);

  run.later(() => {
    assertShow(assert, this);
  }, 320);

  /* Check it still hides immediately */

  run.later(() => {
    run(() => {
      this.$().trigger('mouseleave');
    });

    assertHide(assert, this);

    done();
  }, 350);

});
