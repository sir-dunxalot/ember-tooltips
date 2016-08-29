import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

function assertSpacing(assert, context, expectedSpacing) {
  const $this = context.$();
  const targetPosition = $this.position();
  const $tooltip = $this.find('.ember-tooltip');
  const tooltipPosition = $tooltip.position();
  const offset = Math.floor(targetPosition.top - tooltipPosition.top);

  const paddingTop = parseInt($tooltip.css('padding-top'));
  const paddingBottom = parseInt($tooltip.css('padding-bottom'));
  const actualSpacing = offset - paddingTop - paddingBottom;

  /* Allow a small margin of error because of how browsers
  render pixels */

  assert.ok(expectedSpacing - 2 < actualSpacing && actualSpacing < expectedSpacing + 2,
    `Tooltip should be ${expectedSpacing}px from the target`);

}

moduleForComponent('tooltip-on-component', 'Integration | Option | spacing', {
  integration: true
});

test('It shows with showOn', function(assert) {

  assert.expect(2);

  /* Check the default spacing */

  this.render(hbs`{{tooltip-on-component}}`);

  assertSpacing(assert, this, 10);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-component spacing=20}}`);

  assertSpacing(assert, this, 20);

});
