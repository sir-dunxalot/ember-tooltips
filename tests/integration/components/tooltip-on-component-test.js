import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertNotRendered, assertRendered } from '../../helpers/sync/assert-visibility';

moduleForComponent('tooltip-on-component', 'Integration | Component | tooltip on component', {
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

  assertRendered(assert, this);
});

test('tooltip-on-component does initially render when enableLazyRendering=true', function(assert) {

  this.render(hbs`
    {{#some-component}}
      {{#tooltip-on-component enableLazyRendering=true}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertNotRendered(assert, this);
});
