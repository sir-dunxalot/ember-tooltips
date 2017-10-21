import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipContent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | updateFor', {
  integration: true,
});

test('updateFor test', function(assert) {

  assert.expect(2);

  this.set('asyncContent', null);

  this.render(hbs`
    {{#ember-tooltip updateFor=asyncContent isShown=true}}
      {{#if asyncContent}}
        {{asyncContent}}
      {{else}}
        ...
      {{/if}}
    {{/ember-tooltip}}
  `);

  afterTooltipRenderChange(assert, () => {

    assertTooltipContent(assert, {
      contentString: '...',
    });

    afterTooltipRenderChange(assert, () => {

      /* After 200ms, change the async content */

      this.set('asyncContent', 'Some model');

      afterTooltipRenderChange(assert, () => {
        assertTooltipContent(assert, {
          contentString: 'Some model',
        });
      });
    }, 200);
  });
});
