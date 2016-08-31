import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-component', 'Integration | Option | event', {
  integration: true
});

test('Popover toggles with hover', function(assert) {

  const done = assert.async();

  assert.expect(3);

  this.render(hbs`{{popover-on-component}}`);

  assertHide(assert, this);

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run(() => {
    this.$().trigger('mouseleave');
  });

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 350);
});

test('Popover toggles with click', function(assert) {

  assert.expect(3);

  this.render(hbs`{{popover-on-component event='click'}}`);

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

// TODO Popover toggles with focus
// TODO create a focus-test.js and focus interactivity
