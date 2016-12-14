import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Component | popover on element', {
	integration: true
});

test(`attachment and targetAttachment override test`, function(assert) {

	assert.expect(4);

	this.render(hbs`{{popover-on-element targetAttachment='top right' attachment='top left' keepInWindow=false}}`);

	const $target = this.$();
	const $popover = $target.find('.ember-popover');

	const classPrefix = 'ember-tooltip-or-popover';
	const targetClassPrefix =  `${classPrefix}-target-attached`;
	const popoverClassPrefix = `${classPrefix}-element-attached`;

	assert.ok($target.hasClass(`${targetClassPrefix}-top`),
			'the $target should have the prefixed top position class');
	assert.ok($target.hasClass(`${targetClassPrefix}-right`),
			'the $target should have the prefixed right position class');

	assert.ok($popover.hasClass(`${popoverClassPrefix}-top`),
			'the $popover should have the prefixed top position class');
	assert.ok($popover.hasClass(`${popoverClassPrefix}-left`),
			'the $popover should have the prefixed left position class');

});
