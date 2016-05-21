import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-parent', 'Integration | Component | tooltip on parent', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tooltip-on-parent}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tooltip-on-parent}}
      template block text
    {{/tooltip-on-parent}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
