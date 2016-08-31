import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover with click toggle', function(assert) {

  assert.expect(3);

  this.render(hbs`{{popover-on-element event="click"}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('click');
  });

  assertHide(assert, this);

});

test('Popover: click target, click popover, click target', function(assert) {

  // assert.expect(4);

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $target = this.$();
  const $popover = $target.find('.ember-popover');

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $popover.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertHide(assert, this);

});

test('Popover: hover/click target, hover/click popover, hover/click target', function(assert) {

  // assert.expect(4);

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $target = this.$();
  const $popover = $target.find('.ember-popover');

  assertHide(assert, this);

  run(() => {
    $target.trigger('mouseover');
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $target.trigger('mouseout');
    $popover.trigger('mouseover');
    $popover.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $popover.trigger('mouseout');
    $target.trigger('mouseover');
    $target.trigger('click');
  });

  assertHide(assert, this);

});

test('Popover: click target, click popover, click elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="click"}}`);

  const done = assert.async();
  const $target = this.$();
  const $popover = $target.find('.ember-popover');

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $popover.trigger('mouseenter');
    $popover.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    /* mouseleave the popover and focusout */
    $popover.trigger('mouseleave');
    $popover.trigger('focusout');
  });

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 50);


});
