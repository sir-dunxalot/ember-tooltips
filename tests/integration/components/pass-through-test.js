import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('pass through attributes test', function(assert) {

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


  const $tooltip = this.$().find('.ember-tooltip');

  // assert that the attributes are passed from
  // the lazy-render-wrapper component to the $tooltip

  assert.equal($tooltip.attr('id'), 'some-id');

  assert.ok($tooltip.hasClass('foo'));

  assert.ok($tooltip.hasClass('bar-falsy'));

  assert.ok($tooltip.hasClass('baz-truthy'));

  assert.equal($tooltip.attr('role'), 'foo');

  assert.equal($tooltip.attr('tabindex'), '2');
});
