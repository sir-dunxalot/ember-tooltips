import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  findTooltip,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Component | tooltip on element', {
  integration: true,
});

['slide', 'fade', 'none'].forEach((effectType) => {
  test(`ember-tooltip effect=${effectType} class test`, function(assert) {

    this.set('effectType', effectType);
    this.render(hbs`{{ember-tooltip effect=effectType isShown=true}}`);

    afterTooltipRenderChange(assert, () => {
      const $tooltip = findTooltip();

      assert.ok($tooltip.hasClass(`ember-tooltip-effect-${effectType}`),
        `the tooltip should have the ${effectType} effect class`);

    });
  });
});
