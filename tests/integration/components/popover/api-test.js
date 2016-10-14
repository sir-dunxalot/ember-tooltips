import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertPopoverHide, assertPopoverShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | API', {
  integration: true
});

test('Popover: click target, click hideAction', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideAction' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $target = this.$();
  const $hideAction = $target.find('.hideAction');

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $hideAction.trigger('click');
  });

  assertPopoverHide(assert, this);

  assert.expect(6);

});

test('Popover: click target, click hideAction, click target', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideAction' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $target = this.$();
  const $hideAction = $target.find('.hideAction');

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  run(() => {
    $hideAction.trigger('click');
  });

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  assert.expect(8);

});

test('Popover: click target, click popover, click hideAction, click target', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideAction' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $target = this.$();
  const $popover = $target.find('.ember-popover');
  const $hideAction = $target.find('.hideAction');

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
    $hideAction.trigger('click');
  });

  assertPopoverHide(assert, this);

  run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  assert.expect(10);

});
