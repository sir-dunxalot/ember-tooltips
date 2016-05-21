import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow } from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Component | showOn', {
  integration: true
});

test('It toggles with hover', function(assert) {

  assert.expect(3);

  this.render(hbs`
    {{#tooltip-on-component}}
      Sup
    {{/tooltip-on-component}}
  `);

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
