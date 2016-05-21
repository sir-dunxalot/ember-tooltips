import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-component', 'Integration | Component | tooltip on parent', {
  integration: true
});

test('It renders', function(assert) {

  this.render(hbs`{{tooltip-on-component}}`);

  assert.equal(this.$().text().trim(), '',
    'Should render with no content');

  this.render(hbs`
    {{#tooltip-on-component}}
      template block text
    {{/tooltip-on-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text',
    'Should render with content');

  assert.ok(this.$().find('.tooltip').length,
    'Should create a tooltip element');

});
