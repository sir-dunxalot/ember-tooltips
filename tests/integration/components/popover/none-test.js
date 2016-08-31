import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-component', 'Integration | Option | event', {
  integration: true
});

test('Popover: never shows with none', function(assert) {

  this.render(hbs`{{popover-on-component event='none'}}`);

  const $target = this.$();

  assertHide(assert, this);

  /* Check focus */

  run(() => {
    $target.trigger('focus');
  });

  assertHide(assert, this);

  /* Check hover */

  run(this, () => {
    $target.trigger('mouseover');
  });

  assertHide(assert, this);

  /* Check click */

  run(this, () => {
    $target.click();
  });

  assertHide(assert, this);

  assert.expect(4);

});
