import { moduleForComponent, test } from 'ember-qunit';
import { triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | pass through properties', {
  integration: true
});

test('tooltip-on-element pass through attributes test', function(assert) {

	this.setProperties({
		bar: false,
		baz: true,
	});

  this.render(hbs`
  	{{tooltip-on-element
  		id="some-id"
			class='foo'
			classNameBindings='bar:bar-truthy:bar-falsy baz:baz-truthy:baz-falsy'
			role='foo'
			tabindex='2'
  	}}
  `);

  triggerTooltipEvent(this.$(), 'mouseenter');

  // assert that the attributes are passed from
  // the lazy-render-wrapper component to the $tooltip

  const $tooltip = this.$().find('.ember-tooltip');

  assert.equal($tooltip.attr('id'), 'some-id',
    'id should be passed through');

  assert.ok($tooltip.hasClass('foo'),
    'class should be passed through');

  assert.ok($tooltip.hasClass('bar-falsy'),
    'Falsy class name bindings should be passed through');

  assert.ok($tooltip.hasClass('baz-truthy'),
    'Truthy class name bindings should be passed through');

  assert.equal($tooltip.attr('role'), 'foo',
    'role should be passed through');

  assert.equal($tooltip.attr('tabindex'), '2',
    'tabindex should be passed through');

});
