import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-component', 'Integration | Option | event', {
  integration: true
});

test('Popover does not show with none', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-component event='none'}}`);

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
