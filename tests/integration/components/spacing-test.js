import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipSpacing } from 'dummy/tests/helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Option | spacing', {
  integration: true,
});

test('ember-tooltip shows with spacing=default', function(assert) {

  assert.expect(1);

  /* Check the default spacing */

  this.render(hbs`{{ember-tooltip effect='none'}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 10,
  });

});

test('ember-tooltip shows with spacing=20', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`{{ember-tooltip spacing=20 effect='none'}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 20,
  });

});

test('ember-tooltip shows with spacing=20 and side=right', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{ember-tooltip
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

test('ember-tooltip shows with spacing=53 and side=bottom', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{ember-tooltip
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
