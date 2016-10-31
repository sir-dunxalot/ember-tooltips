import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertHide, assertShow, assertRendered} from '../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | isShown', {
  integration: true
});

test('It toggles with isShown', function(assert) {

  assert.expect(4);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip}}`);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});

test('It toggles when enableLazyRendering with isShown', function(assert) {

  assert.expect(6);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element isShown=showTooltip enableLazyRendering=true}}`);

  assertRendered(assert, this);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});

test('It toggles with tooltipIsVisible', function(assert) {
	// tooltipIsVisible is deprecated in favor of isShown
	// tooltipIsVisible will be supported until v3.0.0

  assert.expect(4);

  this.set('showTooltip', true);

  this.render(hbs`{{tooltip-on-element tooltipIsVisible=showTooltip}}`);

  assertShow(assert, this);

  run(() => {
    this.set('showTooltip', false);
  });

  assertHide(assert, this);

});
