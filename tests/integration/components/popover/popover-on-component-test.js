import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertNotRendered, assertRendered } from '../../../helpers/sync/assert-visibility';

moduleForComponent('popover-on-component', 'Integration | Component | popover on component', {
  integration: true
});

test('popover-on-component does render when enableLazyRendering=false', function(assert) {

  this.render(hbs`
    {{#some-component}}
      {{#popover-on-component enableLazyRendering=false}}
        template block text
      {{/popover-on-component}}
    {{/some-component}}
  `);

  assertRendered(assert, this);
});

test('popover-on-component does initially render when enableLazyRendering=true', function(assert) {

  this.render(hbs`
    {{#some-component}}
      {{#popover-on-component enableLazyRendering=true}}
        template block text
      {{/popover-on-component}}
    {{/some-component}}
  `);

  assertNotRendered(assert, this);
});
