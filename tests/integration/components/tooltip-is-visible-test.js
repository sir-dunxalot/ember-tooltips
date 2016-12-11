import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, assertTooltipRendered } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | isShown', {
  integration: true
});


test('tooltip-on-element toggles with isShown', function(assert) {

  assert.expect(2);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip}}`);

  const $body = this.$().parents('body');

  assertTooltipVisible($body, assert);

  this.set('showTooltip', false);

  assertTooltipNotVisible($body, assert);

});

test('tooltip-on-element toggles when enableLazyRendering with isShown', function(assert) {

  assert.expect(3);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip enableLazyRendering=true}}`);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

  assertTooltipVisible($body, assert);

  this.set('showTooltip', false);

  assertTooltipNotVisible($body, assert);

});
