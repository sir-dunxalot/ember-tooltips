import { moduleForComponent, test } from 'ember-qunit';
import { findTooltip } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Component | tooltip on element', {
  integration: true,
});

['slide', 'fade', 'none'].forEach((effectType) => {
  test(`ember-tooltip effect=${effectType} class test`, function(assert) {

    this.set('effectType', effectType);
    this.render(hbs`{{ember-tooltip effect=effectType}}`);

    const $tooltip = findTooltip();

    assert.ok($tooltip.hasClass(`ember-tooltip-or-popover-${effectType}`),
        `the tooltip should have the ${effectType} effect class`);

  });
});
