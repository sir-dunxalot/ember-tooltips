import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-component', 'Integration | Component | tooltip on parent', {
  integration: true
});

test('It renders with no content', function(assert) {

  this.render(hbs`{{tooltip-on-component}}`);

  assert.equal(this.$().text().trim(), '',
    'Should render with no content');

});

test('It renders with content', function(assert) {

  this.render(hbs`
    {{#tooltip-on-component}}
      template block text
    {{/tooltip-on-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text',
    'Should render with content');

  assert.ok(this.$().find('.ember-tooltip').length,
    'Should create a tooltip element');

});
