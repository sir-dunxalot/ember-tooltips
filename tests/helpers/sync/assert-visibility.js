export function assertShow(assert, context) {

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'false',
    'Should show tooltip');
  
  assert.equal(context.$().find('.ember-tooltip').attr('data-tether-enabled'), 'true',
    'Should enable tether');

}

export function assertHide(assert, context, options) {

  // if the tooltip is shown after a delay, it should be hidden but
  // tethering should still be enabled
  let tetherEnabled = options && options.tetherEnabled;
  let tetherAttrValue = tetherEnabled ? 'true' : 'false';

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'true',
    'Should hide tooltip');

  assert.equal(context.$().find('.ember-tooltip').attr('data-tether-enabled'), tetherAttrValue,
    `Should ${tetherEnabled ? 'enable' : 'disable'} tether`);

}

export function assertPopoverShow(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'false',
    'Should show popover');

  assert.equal(context.$().find('.ember-popover').attr('data-tether-enabled'), 'true',
    'Should enable tether');

}

export function assertPopoverHide(assert, context) {

  assert.equal(context.$().find('.ember-popover').attr('aria-hidden'), 'true',
    'Should hide popover');

  assert.equal(context.$().find('.ember-popover').attr('data-tether-enabled'), 'false',
    'Should disable tether');

}
