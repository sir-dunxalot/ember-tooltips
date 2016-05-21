import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('It renders', function(assert) {

  this.render(hbs`{{tooltip-on-element}}`);

  assert.equal(this.$().text().trim(), '',
    'Should render with no content');

  this.render(hbs`
    {{#tooltip-on-element}}
      template block text
    {{/tooltip-on-element}}
  `);

  assert.equal(this.$().text().trim(), 'template block text',
    'Should render with content');

  assert.ok(this.$().find('.tooltip').length,
    'Should create a tooltip element');

});
