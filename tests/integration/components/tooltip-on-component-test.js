import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipContent,
} from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-component', 'Integration | Component | tooltip-on-component', {
  integration: true,
});

test('tooltip-on-component does render when enableLazyRendering=false', function(assert) {

  assert.expect(2);

  this.render(hbs`
    {{#some-component}}
      {{#tooltip-on-component enableLazyRendering=false}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertTooltipContent(assert, {
    contentString: 'template block text',
  });

  assertTooltipRendered(assert);
});

test('tooltip-on-component does not eagerly render when enableLazyRendering=true', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#some-component}}
      {{#tooltip-on-component enableLazyRendering=true}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertTooltipNotRendered(assert);
});
