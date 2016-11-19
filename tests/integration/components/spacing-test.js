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

moduleForComponent('tooltip-on-element', 'Integration | Option | spacing', {
  integration: true
});

test('tooltip-on-element shows with showOn spacing=default', function(assert) {

  assert.expect(1);

  /* Check the default spacing */

  this.render(hbs`{{tooltip-on-element}}`);

  assertSpacing(assert, this, 10);

});

test('tooltip-on-element shows with showOn spacing=default', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-element spacing=20}}`);

  assertSpacing(assert, this, 20);

});
