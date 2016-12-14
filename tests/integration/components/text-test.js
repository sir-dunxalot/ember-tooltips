import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipRendered } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Component | inline', {
  integration: true
});

test('tooltip-on-element renders with text param', function(assert) {

	assert.expect(2);

  this.render(hbs`
    {{tooltip-on-element text='Here is more info'}}
  `);


  assert.equal(this.$().text().trim(), 'Here is more info',
    'Should render with content equal to the text property');

  assertTooltipRendered(assert);

});
