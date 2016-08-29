import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover with hover visible with long delay', function(assert) {

  const done = assert.async();
  const HIDE_DELAY = 500;

  this.render(hbs`{{popover-on-element hideDelay="500"}}`);

  const $target = this.$();

  assertHide(assert, this);

  run(() => {
    $target.trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    $target.trigger('mouseleave');
  });

  run.later(() => {
    assertShow(assert, this);
  }, HIDE_DELAY - 100);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, HIDE_DELAY + 100);

});

test('Popover with hover shown with interaction', function(assert) {
  /*
    Timeline: the popover should only hide if neither elements
    have been moused-over within the 250ms default hideDelay
    0 hidden
    0 target.mouseover
    0 shown
    0 target.mouseleave
    0 shown
    100 popover.mouseover
    100 shown
    350 shown
    400 popover.mouseleave
    400 shown
    750 hidden
  */

  const done = assert.async();

  assert.expect(7);

  this.render(hbs`{{popover-on-element}}`);

  const $target = this.$();
  const $popover = $target.find('.ember-popover');

  assertHide(assert, this);

  run(() => {
    $target.trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    $target.trigger('mouseleave');
  });

  assertShow(assert, this);

  run.later(() => {
    $popover.trigger('mouseover');
  }, 100);

  assertShow(assert, this);

  run.later(() => {
    assertShow(assert, this);
  }, 350);

  run.later(() => {
    $popover.trigger('mouseleave');
  }, 400);

  assertShow(assert, this);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 750);

});
