import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertPopoverHide, assertPopoverShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | hover', {
	integration: true
});

test('Popover: target focus, popover focus, elsewhere focus', function(assert) {

	this.render(hbs`
		<div class="target">
			{{popover-on-element event="focus"}}
		</div>
		<a href class="elsewhere"></a>
	`);

	const done = assert.async();
	const $target = $('.target');
	const $popover = $target.find('.ember-popover');
	const $elsewhere = $('.elsewhere');

	assertPopoverHide(assert, this);

	run(() => {
		$target.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popover.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popover.trigger('focusout');
		$elsewhere.trigger('focus');
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 10);

	assert.expect(4);

});

test('Popover: target focus, targetInterior focus, popover focus, elsewhere focus', function(assert) {

	this.render(hbs`
		<div class="target">
			<a href class="target-interior"></a>
			{{popover-on-element event="focus"}}
		</div>
		<a href class="elsewhere"></a>
	`);

	const done = assert.async();
	const $target = $('.target');
	const $targetInterior = $target.find('.target-interior');
	const $popover = $target.find('.ember-popover');
	const $elsewhere = $('.elsewhere');

	assertPopoverHide(assert, this);

	run(() => {
		$target.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$targetInterior.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popover.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popover.trigger('focusout');
		$elsewhere.trigger('focus');
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 10);

	assert.expect(5);

});

test('Popover: target focus, popover focus, popoverInterior focus, elsewhere focus', function(assert) {

	this.render(hbs`
		<div class="target">
			{{#popover-on-element event="focus"}}
				<a href class="popover-interior"></a>
			{{/popover-on-element}}
		</div>
		<a href class="elsewhere"></a>
	`);

	const done = assert.async();
	const $target = $('.target');
	const $popover = $target.find('.ember-popover');
	const $popoverInterior = $target.find('.popover-interior');
	const $elsewhere = $('.elsewhere');

	assertPopoverHide(assert, this);

	run(() => {
		$target.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popover.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$popoverInterior.trigger('focus');
	});

	assertPopoverShow(assert, this);

	run(() => {
		$elsewhere.trigger('focus');
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 10);

	assert.expect(5);

});
