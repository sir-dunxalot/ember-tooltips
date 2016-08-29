import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | tooltipIsVisible', {
  integration: true
});

test('Popover toggles with tooltipIsVisible', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{popover-on-element tooltipIsVisible=showTooltip}}`);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});
