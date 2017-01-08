import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipRendered, assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Component | inline', {
  integration: true,
});

test('tooltip-on-element renders with text param', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{tooltip-on-element text='Here is more info'}}
  `);

  assertTooltipContent(assert, {
    contentString: 'Here is more info',
  });

  assertTooltipRendered(assert);
});
