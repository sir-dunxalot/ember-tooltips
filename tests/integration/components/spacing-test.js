import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipSpacing } from 'dummy/tests/helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Option | spacing', {
  integration: true,
});

test('tooltip-on-element shows with spacing=default', function(assert) {

  assert.expect(1);

  /* Check the default spacing */

  this.render(hbs`{{tooltip-on-element effect='none'}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 10,
  });

});

test('tooltip-on-element shows with spacing=20', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-element spacing=20 effect='none'}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 20,
  });

});

test('tooltip-on-element shows with spacing=20 and side=right', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{tooltip-on-element
      effect='none'
      spacing=20
      side='right'
      keepInWindow=false
    }}
  `);

  assertTooltipSpacing(assert, {
    side: 'right',
    spacing: 20,
  });

});

test('tooltip-on-element shows with spacing=53 and side=bottom', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{tooltip-on-element
      effect='none'
      spacing=53
      side='bottom'
      keepInWindow=false
    }}
  `);

  assertTooltipSpacing(assert, {
    side: 'bottom',
    spacing: 53,
  });

});
