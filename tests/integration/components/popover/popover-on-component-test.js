import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-component', 'Integration | Component | popover on component', {
  integration: true
});

test('popover-on-component renders with no content', function(assert) {

  this.render(hbs`{{popover-on-component}}`);

  assert.equal(this.$().text().trim(), '',
    'Should render with no content');

});

test('popover-on-component renders with content', function(assert) {

  this.render(hbs`
    {{#popover-on-component}}
      template block text
    {{/popover-on-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text',
    'Should render with content');

  assert.ok(this.$().find('.ember-popover').length,
    'Should create a popover element');

});
