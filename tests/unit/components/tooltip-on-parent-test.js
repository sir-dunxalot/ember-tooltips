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
  const parentView = Ember.View.create({
    renderTooltip() {
      assert.ok(true,
        'The renderTooltip() method should be called on the parent view after render');
    }
  });

  assert.expect(4);

  component.set('parentView', parentView);

  assert.equal(component._state, 'preRender',
    'Should create the component instance');

  assert.ok(!!component.registerOnParent,
    'The component should have a public registerOnParent method');

  this.render();

  assert.equal(component._state, 'inDOM');

});
