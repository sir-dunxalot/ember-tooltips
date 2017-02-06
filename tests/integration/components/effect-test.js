import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true,
});

['slide', 'fade', 'none'].forEach((effectType) => {
  test(`tooltip-on-element effect=${effectType} class test`, function(assert) {

    this.set('effectType', effectType);
    this.render(hbs`{{tooltip-on-element effect=effectType}}`);

    const $tooltip = this.$().find('.ember-tooltip');

    assert.ok($tooltip.hasClass(`ember-tooltip-or-popover-${effectType}`),
        `the tooltip should have the ${effectType} effect class`);

  });
});
