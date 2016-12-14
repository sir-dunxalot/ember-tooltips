import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipRendered, triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('tooltip-on-element renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#tooltip-on-element}}
      template block text
    {{/tooltip-on-element}}
  `);


  triggerTooltipEvent(this.$(), 'mouseenter');

  assert.equal(this.$().text().trim(), 'template block text',
    'Should render with content');

  assertTooltipRendered(assert);

});

test('tooltip-on-element has the proper aria-describedby tag', function(assert) {

  assert.expect(2);

  this.render(hbs`
    <div class="target">
      Hover here!

      {{#tooltip-on-element}}
        Some info in a tooltip.
      {{/tooltip-on-element}}
    </div>
  `);

  triggerTooltipEvent(this.$('.target'), 'mouseenter');

  const $tooltipTarget = this.$('.target');
  const describedBy = $tooltipTarget.attr('aria-describedby');

  console.log($tooltipTarget);

  assert.equal(this.$(`#${describedBy}`).text().trim(), 'Some info in a tooltip.');
  assert.equal(describedBy.indexOf('#'), '-1');

});
