import Ember from 'ember';
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
});

test('It animates with the target', function(assert) {
  const done = assert.async();

  this.render(hbs`
    {{#tooltip-on-element}}
      Sup
    {{/tooltip-on-element}}
  `);

  assert.equal(this.$().find('.tooltip').attr('aria-hidden'), 'true',
    'Should be hidden by default');

  assert.equal(this.$().find('.tooltip').css('opacity'), '0',
    'Tooltip should be hidden with CSS');

  Ember.run(this, () => {
    this.$().trigger('mouseover');
  });

  assert.equal(this.$().find('.tooltip').attr('aria-hidden'), 'false',
    'Should show on hover of parentView');

  Ember.run.later(this, () => {
    assert.equal(this.$().find('.tooltip').css('opacity'), '1',
      'Tooltip should be shown with CSS');
    done();
  }, 200);

});
