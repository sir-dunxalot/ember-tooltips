import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | hover', {
  integration: true
});

test('Popover: hover target, hover elsewhere', function(assert) {

  this.render(hbs`{{popover-on-element event="hover" hideDelay="250"}}`);

  const done = assert.async();
  const $target = this.$();

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
    assertHide(assert, this);
    done();
  }, 300);

  assert.expect(4);

});

test('Popover: hover target, hover popover (too slow)', function(assert) {

  this.render(hbs`{{popover-on-element event="hover" hideDelay="250"}}`);

  const done = assert.async();
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

  run.later(() => {
    $popover.trigger('mouseover');
    // hideDelay is 250ms, it took the 'user' 500ms to mouseover the popover
  }, 500);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 500);

  assert.expect(3);

});

test('Popover: hover target, hover inbetween, hover popover, hover elsewhere', function(assert) {
  /*
    Timeline: the popover should only hide if neither elements
    have been moused-over within the 250ms hideDelay
    0 hidden
    0 target.mouseover
    0 shown
    0 target.mouseleave
    0 shown
    100 popover.mouseover
    200 shown
    300 popover.mouseleave
    400 shown
    1000 hidden
  */

  this.render(hbs`{{popover-on-element event="hover" hideDelay="250"}}`);

  const done = assert.async();
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

  run.later(() => {
    assertShow(assert, this);
  }, 200);

  run.later(() => {
    $popover.trigger('mouseleave');
  }, 300);

  run.later(() => {
    assertShow(assert, this);
  }, 400);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 1000);

  assert.expect(6);

});
