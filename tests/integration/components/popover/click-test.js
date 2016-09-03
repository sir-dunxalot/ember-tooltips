import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertPopoverHide, assertPopoverShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | click', {
  integration: true
});

test('Popover: click target, click target', function(assert) {

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $target = this.$();

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverHide(assert, this);

  assert.expect(3);

});

test('Popover: click target, click popover, click target', function(assert) {

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $target = this.$();
  const $popover = $target.find('.ember-popover');

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $popover.trigger('click');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverHide(assert, this);

  assert.expect(4);

});

test('Popover: click target, click elsewhere', function(assert) {

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{popover-on-element event="click"}}
      </div>
    </div>
  `);

  const $target = this.$('.target');
  const $elsewhere = $('.elsewhere');

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $elsewhere.trigger('click');
  });

  assertPopoverHide(assert, this);

  assert.expect(3);

});

test('Popover: click target, click popover, click elsewhere', function(assert) {

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{popover-on-element event="click"}}
      </div>
    </div>
  `);

  const $elsewhere = this.$('.elsewhere');
  const $target = this.$('.target');
  const $popover = $target.find('.ember-popover');

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $popover.trigger('click');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $elsewhere.trigger('click');
  });

  assertPopoverHide(assert, this);

  assert.expect(4);

});
