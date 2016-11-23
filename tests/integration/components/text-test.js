import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | text', {
  integration: true
});

test('It renders', function(assert) {

  this.render(hbs`
    {{tooltip-on-element text='Here is more info'}}
  `);

  assert.equal(this.$().text().trim(), 'Here is more info',
    'Should render with content equal to the text property');

  assert.ok(this.$().find('.ember-tooltip').length,
    'Should create a tooltip element');

});
