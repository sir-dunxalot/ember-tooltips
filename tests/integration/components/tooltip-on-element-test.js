import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipRendered } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

import { assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true,
});

test('tooltip-on-element renders', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#tooltip-on-element}}
      template block text
    {{/tooltip-on-element}}
  `);

  assertTooltipContent(assert, {
    contentString: 'template block text',
  });

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

  const $tooltipTarget = this.$('.target');
  const describedBy = $tooltipTarget.attr('aria-describedby');

  assertTooltipContent(assert, {
    selector: `#${describedBy}`,
    contentString: 'Some info in a tooltip.',
  });
  assert.equal(describedBy.indexOf('#'), '-1');

});
