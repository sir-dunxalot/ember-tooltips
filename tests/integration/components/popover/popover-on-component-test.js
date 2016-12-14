import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotRendered, assertTooltipRendered } from '../../../helpers/ember-tooltips';

moduleForComponent('popover-on-component', 'Integration | Component | popover on component', {
  integration: true
});

test('popover-on-component does render when enableLazyRendering=false', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#some-component}}
      {{#popover-on-component enableLazyRendering=false}}
        template block text
      {{/popover-on-component}}
    {{/some-component}}
  `);


  assertTooltipRendered(assert);
});

test('popover-on-component does not eagerly render when enableLazyRendering defaults to true', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#some-component}}
      {{#popover-on-component}}
        template block text
      {{/popover-on-component}}
    {{/some-component}}
  `);


  assertTooltipNotRendered(assert);
});
