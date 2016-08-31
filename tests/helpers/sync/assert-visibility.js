export function assertShow(assert, context) {

  assert.equal(context.$().find('.tooltip-and-popover').attr('aria-hidden'), 'false',
    'Should show tooltip or popover');

}

export function assertHide(assert, context) {

  assert.equal(context.$().find('.tooltip-and-popover').attr('aria-hidden'), 'true',
    'Should hide tooltip or popover');

}
