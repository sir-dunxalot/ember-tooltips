import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipRendered, assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Component | inline', {
  integration: true,
});

test('ember-tooltip renders with text param', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{ember-tooltip text='Here is more info'}}
  `);

  assertTooltipContent(assert, {
    contentString: 'Here is more info',
  });

  assertTooltipRendered(assert);
});
