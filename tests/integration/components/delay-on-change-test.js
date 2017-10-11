import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | delayOnChange', {
  integration: true,
});

test('ember-tooltip animates with a delay', function(assert) {

  assert.expect(2);

  /* Create two tooltips and show one */

  this.render(hbs`
    {{ember-tooltip delay=300 delayOnChange=false tooltipClassName='ember-tooltip test-tooltip' text='Hey'}}
    {{ember-tooltip delayOnChange=false isShown=true event='none' text='Hi'}}
  `);

  afterTooltipRenderChange(assert, () => {

    assertTooltipNotRendered(assert, { selector: '.test-tooltip' });

    /* We still need a small delay, but now we check the
    test tooltip is shown *almost* immediately after hover
    instead of after a 300ms delay */

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert, { selector: '.test-tooltip' });
    });
  });
});
