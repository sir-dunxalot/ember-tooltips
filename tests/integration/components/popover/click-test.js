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

  const $target = this.$();

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertHide(assert, this);

});

test('Popover with click on popover and focusout', function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{popover-on-element event="click"}}
  `);

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

  assertHide(assert, this);

});
