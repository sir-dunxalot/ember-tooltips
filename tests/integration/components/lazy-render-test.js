import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertNotRendered, assertRendered } from '../../helpers/sync/assert-visibility';
import { INTERACTION_EVENT_TYPES } from 'ember-tooltips/components/tooltip-on-element';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

// TODO find some way of sharing this eventType array from the tooltip-on-element component
INTERACTION_EVENT_TYPES.forEach(function(eventType) {
  test(`it renders lazily after ${eventType} when enabledLazyRendering=true`, function(assert) {

    this.render(hbs`
      {{tooltip-on-element enableLazyRendering=true}}
    `);

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
  this.render(hbs`
    {{tooltip-on-element enableLazyRendering=false}}
  `);

  assertRendered(assert, this);
});
