import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import {
  assertTooltipVisible,
  assertTooltipNotRendered
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Component | unstable root', {
  integration: true,
});

test('tooltip-on-element does not throw an error when in unstable root element', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`
    {{#if showTooltip}}
      {{#tooltip-on-element
        isShown=showTooltip
      }}
        Test content
      {{/tooltip-on-element}}
    {{/if}}
  `);
  

  assertTooltipVisible(assert);

  this.set('showTooltip', false);

  // The Glimmer 2 update would cause the tooltips to break when wrapped by an unstable root element
  // In this case the {{if}}
  // An error would be thrown if the tooltip component was not wrapped by a div in the lazy-wrapper template
  // The error thrown would be: DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
  // More info: https://github.com/yapplabs/ember-wormhole/issues/66
  assertTooltipNotRendered(assert);

});