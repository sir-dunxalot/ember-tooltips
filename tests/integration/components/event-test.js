import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | event', {
  integration: true
});

test('It toggles with hover', function(assert) {

  assert.expect(6);

  this.render(hbs`{{tooltip-on-component}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  assertHide(assert, this);

});

test('It toggles with click', function(assert) {

  assert.expect(6);

  this.render(hbs`{{tooltip-on-component event='click'}}`);

  assertHide(assert, this);

  run(() => {
    this.$().click();
  });

  assertShow(assert, this);

  run(this, () => {
    this.$().click();
  });

  assertHide(assert, this);

});

test('It toggles with focus', function(assert) {

  assert.expect(6);

  this.render(hbs`
    <div id="target">
      {{tooltip-on-element event='focus'}}
    </div>
  `);

  const target = window.document.getElementById('target');

  assertHide(assert, this);

  run(() => {
    target.dispatchEvent(new window.Event('focus'));
  });

  assertShow(assert, this);

  run(this, () => {
    target.dispatchEvent(new window.Event('blur'));
  });

  assertHide(assert, this);

});

test('It does not show with none', function(assert) {

  assert.expect(8);

  this.render(hbs`{{tooltip-on-component event='none'}}`);

  assertHide(assert, this);

  /* Check focus */

  run(() => {
    this.$().trigger('focus');
  });

  assertHide(assert, this);

  /* Check hover */

  run(this, () => {
    this.$().trigger('mouseover');
  });

  assertHide(assert, this);

  /* Check click */

  run(this, () => {
    this.$().click();
  });

  assertHide(assert, this);

});
