import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertNotRendered, assertRendered } from '../../helpers/sync/assert-visibility';
import { INTERACTION_EVENT_TYPES } from 'ember-tooltips/components/lazy-render-wrapper';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

INTERACTION_EVENT_TYPES.forEach(function(eventType) {
  test(`it renders lazily after ${eventType} when enabledLazyRendering=true`, function(assert) {

    this.render(hbs`{{tooltip-on-element enableLazyRendering=true}}`);

    const done = assert.async();

    assertNotRendered(assert, this);

    Ember.run(() => {
      this.$().trigger(eventType);
    });

    Ember.run.next(() => {
      assertRendered(assert, this);
      done();
    });
  });
});

test('it renders automatically when enabledLazyRendering=false', function(assert) {
  this.render(hbs`{{tooltip-on-element enableLazyRendering=false}}`);

  assertRendered(assert, this);
});

test('it renders automatically when isShown=true', function(assert) {
  this.render(hbs`{{tooltip-on-element enableLazyRendering=true isShown=true}}`);

  assertRendered(assert, this);
});

test('it renders automatically when tooltipIsVisible=true', function(assert) {
  this.render(hbs`{{tooltip-on-element enableLazyRendering=true tooltipIsVisible=true}}`);

  assertRendered(assert, this);
});
