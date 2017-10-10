import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import {
  afterTooltipRenderChange,
  assertTooltipContent,
  assertTooltipRendered,
  assertTooltipNotRendered,
  findTooltipTarget,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Component | ember-tooltip', {
  integration: true,
});

test('ember-tooltip renders', function(assert) {

  assert.expect(3);

  this.render(hbs`
    {{#ember-tooltip}}
      template block text
    {{/ember-tooltip}}
  `);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {

    assertTooltipRendered(assert);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });
  });

});

test('ember-tooltip has the proper aria-describedby tag', function(assert) {

  assert.expect(2);

  this.render(hbs`
    <div class="target">
      Hover here!

      {{#ember-tooltip}}
        Some info in a tooltip.
      {{/ember-tooltip}}
    </div>
  `);

  triggerTooltipTargetEvent(this.$(), 'mouseenter', {
    selector: '.target',
  });

  afterTooltipRenderChange(assert, () => {
    const $tooltipTarget = findTooltipTarget();
    const describedBy = $tooltipTarget.attr('aria-describedby');

    /* Whatever the target is 'described by' should be a tooltip with our expected content from the template above */

    assertTooltipContent(assert, {
      selector: `#${describedBy}`,
      contentString: 'Some info in a tooltip.',
    });

    assert.equal(describedBy.indexOf('#'), '-1');
  });

});
