import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertNotRendered, assertRendered } from '../../helpers/sync/assert-visibility';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('it renders', function(assert) {

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

  assert.ok(this.$().find('.ember-tooltip').length,
    'Should create a tooltip element');

});

['mouseenter', 'click', 'focusin'].forEach(function(eventType) {
  test(`it renders lazily after ${eventType}`, function(assert) {

    this.render(hbs`
      {{tooltip-on-element}}
    `);

    const done = assert.async();

    assertNotRendered(assert, this);

    Ember.run(() => {
      this.$().trigger(eventType);
    });

    Ember.run.next(() => {
      assertRendered(assert, this);
      done();
    });
  });
});


test('it has the proper aria-describedby tag', function(assert) {
  assert.expect(2);

  this.render(hbs`
    <div class="target">
      Hover here!

      {{#tooltip-on-element}}
        Some info in a tooltip.
      {{/tooltip-on-element}}
    </div>
  `);

  const $tooltipTarget = this.$('.target');
  const describedBy = $tooltipTarget.attr('aria-describedby');

  assert.equal(this.$(`#${describedBy}`).text().trim(), 'Some info in a tooltip.');
  assert.equal(describedBy.indexOf('#'), '-1');
});
