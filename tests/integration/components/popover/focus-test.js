import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { assertPopoverHide, assertPopoverShow } from '../../../helpers/sync/assert-visibility';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('popover-on-element', 'Integration | Option | hover', {
	integration: true
});

test('Popover: target focus, popover focus, popover blur', function(assert) {

	this.render(hbs`
		<div id="target">
			{{popover-on-element event='focus' id="popover"}}
		</div>
	`);

	const done = assert.async();
	const target = window.document.getElementById('target');
	const popover = window.document.getElementById('popover');

	assertPopoverHide(assert, this);

	run(() => {
		target.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('blur'));
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 100);

	assert.expect(4);

});


test('Popover: target focus, targetInterior focus, popover focus, popover blur', function(assert) {

	this.render(hbs`
		<div id="target">
			<a href id="target-interior"></a>
			{{popover-on-element event='focus' id="popover"}}
		</div>
	`);

	const done = assert.async();
	const target = window.document.getElementById('target');
	const targetInterior = window.document.getElementById('target-interior');
	const popover = window.document.getElementById('popover');

	assertPopoverHide(assert, this);

	run(() => {
		target.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		targetInterior.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('blur'));
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 100);

	assert.expect(5);

});

test('Popover: target focus, popover focus, popoverInterior focus, popover blur', function(assert) {

	this.render(hbs`
		<div id="target">
			{{#popover-on-element event='focus' id="popover"}}
				<a href id="popover-interior"></a>
			{{/popover-on-element}}
		</div>
	`);

	const done = assert.async();
	const target = window.document.getElementById('target');
	const popover = window.document.getElementById('popover');
	const popoverInterior = window.document.getElementById('popover-interior');

	assertPopoverHide(assert, this);

	run(() => {
		target.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popoverInterior.dispatchEvent(new window.Event('focus'));
	});

	assertPopoverShow(assert, this);

	run(() => {
		popover.dispatchEvent(new window.Event('blur'));
	});

	run.later(() => {
		assertPopoverHide(assert, this);
		done();
	}, 100);

	assert.expect(5);

});
