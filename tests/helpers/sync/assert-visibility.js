export function assertShow(assert, context) {

	const $tooltip = context.$().find('.ember-tooltip');
  assert.equal($tooltip.attr('aria-hidden'), 'false', 'Should show tooltip');
  assert.equal($tooltip.attr('is-tether-enabled'), 'true',
  	'tether should be enabled if tooltip is visible');

}

export function assertHide(assert, context) {

  const $tooltip = context.$().find('.ember-tooltip');
  assert.equal($tooltip.attr('aria-hidden'), 'true', 'Should hide tooltip');
  assert.equal($tooltip.attr('is-tether-enabled'), 'false',
    'tether should NOT be enabled if tooltip is visible');

}


export function assertPopoverShow(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'false',
    'Should show popover');

}

export function assertPopoverHide(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'true',
    'Should hide popover');

}
