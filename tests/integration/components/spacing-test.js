import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSpacing } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | spacing', {
  integration: true
});

test('tooltip-on-element shows with spacing=default', function(assert) {

  assert.expect(1);

  /* Check the default spacing */

  this.render(hbs`{{tooltip-on-element}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 10,
  });

});

test('tooltip-on-element shows with spacing=20', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-element spacing=20}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 20,
  });

});

test('tooltip-on-element shows with spacing=20 and side=right', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-element spacing=20 side='right'}}`);

  assertTooltipSpacing(assert, {
    side: 'right',
    spacing: 20,
  });

});
