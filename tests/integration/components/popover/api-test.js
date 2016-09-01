import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
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

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $hideAction.trigger('click');
  });

  assertHide(assert, this);

  assert.expect(3);

});

test('Popover: click target, click hideAction, click target', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideAction' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $target = this.$();
  const $hideAction = $target.find('.hideAction');

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $hideAction.trigger('click');
  });

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  assert.expect(4);

});

test('Popover: click target, click popover, click hideAction, click target', function(assert) {
  // we should keep the run.later and .blur to future proof
  // against to-be-developed 'focus' accessibility events production

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideAction' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const done = assert.async();
  const $target = this.$();
  const $popover = $target.find('.ember-popover');
  const $hideAction = $target.find('.hideAction');

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
    $hideAction.trigger('click');
    $hideAction.trigger('blur');
  });

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  run.later(() => {
    assertShow(assert, this);
    done();
  }, 10);

  assert.expect(5);

});
