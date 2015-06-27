import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

let component;

moduleForComponent('tooltip-on-parent', 'Unit | Component | tooltip on parent', {
  unit: true,

  setup() {
    component = this.subject();
  },
});

test('The component registers itself', function(assert) {
  const parentView = Ember.Component.create({
    renderTooltip() {
      assert.ok(true,
        'The renderTooltip() method should be called on the parent view after render');
    }
  });

  assert.expect(3);

  component.set('parentView', parentView);

  assert.equal(component._state, 'preRender',
    'Should create the component instance');

  assert.ok(!!component.registerOnParent,
    'The component should have a public registerOnParent method');

  /* Mock render instead of calling this.render() because we're
  messing around with parent views */

  component.trigger('didInsertElement');

});
