import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover: click target toggle', function(assert) {

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

test('Popover: click target, click popover, click target', function(assert) {

  assert.expect(4);

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

test('Popover: click target, click popover, click elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        click here for popover
        {{popover-on-element event="click"}}
      </div>
    </div>
  `);

  const $elsewhere = this.$('.elsewhere');
  const $target = this.$('.target');
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
    $elsewhere.trigger('click');
  });

  assertHide(assert, this);

});
