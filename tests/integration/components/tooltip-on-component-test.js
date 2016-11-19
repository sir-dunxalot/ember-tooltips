import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotRendered, assertTooltipRendered } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-component', 'Integration | Component | tooltip-on-component', {
  integration: true
});

test('tooltip-on-component does render when enableLazyRendering=false', function(assert) {

  this.render(hbs`
    {{#some-component}}
      {{#tooltip-on-component enableLazyRendering=false}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test('tooltip-on-component does not eagerly render when enableLazyRendering=true', function(assert) {

  this.render(hbs`
    {{#some-component}}
      {{#tooltip-on-component enableLazyRendering=true}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  const $body = this.$().parents('body');

  assertTooltipNotRendered($body, assert);
});
