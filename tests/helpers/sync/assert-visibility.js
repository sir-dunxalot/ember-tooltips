export function assertShow(assert, context) {

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'false',
    'Should show tooltip');

}

export function assertHide(assert, context) {

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'true',
    'Should hide tooltip');

}


export function assertPopoverShow(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'false',
    'Should show popover');

}

export function assertPopoverHide(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'true',
    'Should hide popover');

}
