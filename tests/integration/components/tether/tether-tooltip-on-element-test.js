import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRendered, assertShow, assertHide } from '../../../helpers/sync/assert-visibility';

moduleForComponent('tether-tooltip-on-element', 'Integration | Component | tether popover on component', {
  integration: true
});

test('tether-tooltip-on-element renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#tether-tooltip-on-element}}
      template block text
    {{/tether-tooltip-on-element}}
  `);

  assertRendered(assert, this);
});

test("tether-tooltip-on-element targets it's parent view", function(assert) {

  assert.expect(7);

  this.render(hbs`
    {{#tether-tooltip-on-element event="click"}}
      template block text
    {{/tether-tooltip-on-element}}
  `);

  const $target = this.$();

  assertRendered(assert, this);

  assert.ok($target.hasClass('ember-tooltip-or-popover-target'));

  Ember.run(() => {
    $target.trigger('click');
  });

  assertShow(assert, this);

  Ember.run(() => {
    $target.trigger('click');
  });

  assertHide(assert, this);
});
