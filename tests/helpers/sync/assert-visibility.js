export function assertShow(assert, context) {

  assert.equal(context.$().find('.tooltip-and-popover').attr('aria-hidden'), 'false',
    'Should show tooltip');
   assert.equal(context.$().find('.tooltip-and-popover').css('opacity'), '1',
   	'Should show tooltip (opacity == 1)'); // TODO(Andrew) remove this, rely on aria

}

export function assertHide(assert, context) {

  assert.equal(context.$().find('.tooltip-and-popover').attr('aria-hidden'), 'true',
    'Should hide tooltip');
  assert.equal(context.$().find('.tooltip-and-popover').css('opacity'), '0',
   	'Should hide tooltip (opacity == 0)'); // TODO(Andrew) remove this, rely on aria

}
