import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSpacing } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | spacing', {
  integration: true
});

test('tooltip-on-element shows with showOn spacing=default', function(assert) {

  assert.expect(2);

  /* Check the default spacing */

  this.render(hbs`{{tooltip-on-element}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 10,
  });

});

test('tooltip-on-element shows with showOn spacing=default', function(assert) {

  assert.expect(2);

  /* Check custom spacing */

  this.render(hbs`{{tooltip-on-element spacing=20}}`);

  assertTooltipSpacing(assert, {
    side: 'top',
    spacing: 20,
  });

});
