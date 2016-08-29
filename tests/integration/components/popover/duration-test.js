import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | duration', {
  integration: true
});

test('Popover hides after the given duration', function(assert) {
  const done = assert.async();

  assert.expect(3);

  this.render(hbs`{{popover-on-element duration=300}}`);

  assertHide(assert, this);

  /* Check the tooltip is hidden after the duration */

  run(() => {
    this.$().trigger('mouseover');
  });

  assertShow(assert, this);

  run.later(() => {
    assertHide(assert, this);
    done();
  }, 320);

});
