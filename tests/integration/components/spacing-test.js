import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipSpacing,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | spacing', {
  integration: true,
});

test('ember-tooltip shows with spacing=default', function(assert) {

  assert.expect(1);

  /* Check the default spacing */

  this.render(hbs`
    {{#some-component}}
      {{ember-tooltip isShown=true}}
    {{/some-component}}
  `);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 10,
    });
  });
});

test('ember-tooltip shows with spacing=20', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{#some-component}}
      {{ember-tooltip spacing=20 isShown=true}}
    {{/some-component}}
  `);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 20,
    });
  });

});

test('ember-tooltip shows with spacing=20 and side=right', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{#some-component}}
      {{ember-tooltip
        isShown=true
        spacing=20
        side='right'
      }}
    {{/some-component}}
  `);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSpacing(assert, {
      side: 'right',
      spacing: 20,
    });
  });

});

test('ember-tooltip shows with spacing=53 and side=bottom', function(assert) {

  assert.expect(1);

  /* Check custom spacing */

  this.render(hbs`
    {{#some-component}}
      {{ember-tooltip
        isShown=true
        spacing=53
        side='bottom'
      }}
    {{/some-component}}
  `);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSpacing(assert, {
      side: 'bottom',
      spacing: 53,
    });
  });

});
