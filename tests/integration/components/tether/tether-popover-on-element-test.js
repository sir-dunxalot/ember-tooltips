import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRendered, assertPopoverShow, assertPopoverHide } from '../../../helpers/sync/assert-visibility';

moduleForComponent('tether-popover-on-element', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-popover-on-element renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#tether-popover-on-element}}
      template block text
    {{/tether-popover-on-element}}
  `);

  assertRendered(assert, this);
});

test("tether-popover-on-element targets it's parent view", function(assert) {

  assert.expect(7);

  this.render(hbs`
    {{#tether-popover-on-element event="click"}}
      template block text
    {{/tether-popover-on-element}}
  `);

  const $target = this.$();

  assertRendered(assert, this);

  assert.ok($target.hasClass('ember-tooltip-or-popover-target'));

  Ember.run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);

  Ember.run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverHide(assert, this);
});

test('tether-popover-on-element can use hide API', function(assert) {

  assert.expect(8);

  this.render(hbs`
    {{#tether-popover-on-element event="click" as |popover|}}
      <span class='hide-button' {{action popover.hide}}></span>
    {{/tether-popover-on-element}}
  `);

  const $target = this.$();
  const $hideButton = $target.find('.hide-button');

  assertRendered(assert, this);

  assertPopoverHide(assert, this);

  Ember.run(() => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverShow(assert, this);


  Ember.run(() => {
    $hideButton.trigger('click');
  });

  assertPopoverHide(assert, this);

});
