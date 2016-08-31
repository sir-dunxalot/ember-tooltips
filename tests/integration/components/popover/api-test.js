import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover: click target, click hideSpan', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideSpan' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const $target = this.$();
  const $hideSpan = $target.find('.hideSpan');

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $hideSpan.trigger('click');
  });

  assertHide(assert, this);

  assert.expect(3);

});

test('Popover: click target, click hideSpan, click target', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideSpan' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const done = assert.async();
  const $target = this.$();
  const $hideSpan = $target.find('.hideSpan');

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  run(() => {
    $hideSpan.trigger('click');
    $hideSpan.trigger('blur');
    // it is necessary to trigger a blur on the span
    // because the span/popover is automatically hidden
  });

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  run.later(() => {
    assertShow(assert, this);
    done();
  }, 10);

  assert.expect(4);

});

test('Popover: click target, click popover, click hideSpan, click target', function(assert) {

  this.render(hbs`
    {{#popover-on-element event="click" as |popover|}}
      <span class='hideSpan' {{action popover.hide}}></span>
    {{/popover-on-element}}
  `);

  const done = assert.async();
  const $target = this.$();
  const $popover = $target.find('.ember-popover');
  const $hideSpan = $target.find('.hideSpan');

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
    $hideSpan.trigger('click');
    $hideSpan.trigger('blur');
    // it is necessary to trigger a blur on the span
    // because the span/popover is automatically hidden
  });

  assertHide(assert, this);

  run(() => {
    $target.trigger('click');
  });

  run.later(() => {
    assertShow(assert, this);
    done();
    // we run.later to future proof against TBD blur accessibility events
  }, 10);

  assert.expect(5);

});
