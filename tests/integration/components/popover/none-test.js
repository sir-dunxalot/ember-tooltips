import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertPopoverHide } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | event', {
  integration: true
});

test('Popover: never shows with none', function(assert) {

  this.render(hbs`{{popover-on-element event='none'}}`);

  const $target = this.$();

  assertPopoverHide(assert, this);

  /* Check focus */

  run(() => {
    $target.trigger('focus');
  });

  assertPopoverHide(assert, this);

  /* Check hover */

  run(this, () => {
    $target.trigger('mouseover');
  });

  assertPopoverHide(assert, this);

  /* Check click */

  run(this, () => {
    $target.trigger('mousedown');
    $target.trigger('mouseup');
  });

  assertPopoverHide(assert, this);

  assert.expect(8);

});
