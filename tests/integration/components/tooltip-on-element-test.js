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

test('it renders lazily', function(assert) {

  this.render(hbs`
    <div id="parent">
      tooltip is here here
      {{tooltip-on-element}}
    </div>
  `);

  const done = assert.async();
  const $parent = this.$().find('#parent');

  assertNotRendered(assert, this);

  Ember.run(() => {
    $parent.trigger('click');
  });

  Ember.run.next(() => {
    assertRendered(assert, this);

    done();
  });

  // const done = assert.async();
  // const $parent = this.$().parent();

  // assertNotRendered(assert, this);

  // Ember.run(() => {
  //   $parent.trigger('click');
  // });

  // Ember.run.later(() => {
  //   assertRendered(assert, this);
  //   done();
  // }, 500);

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
