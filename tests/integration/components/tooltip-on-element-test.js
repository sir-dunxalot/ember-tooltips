import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('It renders', function(assert) {

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

test('it renders passed in classes', function(assert) {
  this.render(hbs`
    <div class="target">
      {{#tooltip-on-element classNames='got-it another-class'}}
        Got it
      {{/tooltip-on-element}}
    </div>
  `);

  const $tooltip = this.$().find('.ember-tooltip');

  assert.ok($tooltip.hasClass('got-it'), 'tooltip has the got-it class');
  assert.ok($tooltip.hasClass('another-class'), 'tooltip has the another-class class');
});
