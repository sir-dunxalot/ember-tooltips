import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, assertTooltipRendered } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | isShown', {
  integration: true,
});

test('tooltip-on-element toggles with isShown', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip}}`);

  assertTooltipVisible(assert);

  this.set('showTooltip', false);

  assertTooltipNotVisible(assert);

});

test('tooltip-on-element toggles when enableLazyRendering with isShown', function(assert) {

  assert.expect(3);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip enableLazyRendering=true}}`);

  assertTooltipRendered(assert);

  assertTooltipVisible(assert);

  this.set('showTooltip', false);

  assertTooltipNotVisible(assert);

});

test('tooltip-on-element toggles with tooltipIsVisible', function(assert) {

  /* The tooltipIsVisible property is deprecated in favor
  of isShown tooltipIsVisible will be supported until v3.0.0
  */

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element tooltipIsVisible=showTooltip}}`);

  assertTooltipVisible(assert);

  run(() => {
    this.set('showTooltip', false);
  });

  assertTooltipNotVisible(assert);

});
