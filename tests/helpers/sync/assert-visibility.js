export function assertNotRendered(assert, context) {
  // assert.notOk(context.$().parent().hasClass('ember-tooltip-or-popover-target'),
  //     'the $parent should not have the ember-tooltip-or-popover-target class');
  // assert.notOk(context.$().find('.ember-tooltip').length,
  //     'the tooltip should not be rendered yet');

  const $parent = context.$().find('#parent');
  const $body = context.$().parents('body'); // tooltips are currently rendered as a
  assert.notOk($parent.hasClass('ember-tooltip-or-popover-target'),
      'initially the $parent SHOULD NOT be the tooltip-or-popover-target');
  assert.notOk($body.find('.ember-tooltip').length,
      'initially the ember-tooltip SHOULD NOT be rendered');
}

export function assertRendered(assert, context) {
  // assert.ok(context.$().parent().hasClass('ember-tooltip-or-popover-target'),
  //     'the $parent should have the ember-tooltip-or-popover-target class');
  // assert.ok(context.$().find('.ember-tooltip').length,
  //     'the tooltip should be rendered yet');


  const $parent = context.$().find('#parent');
  const $body = context.$().parents('body'); // tooltips are currently rendered as a
  assert.ok($parent.hasClass('ember-tooltip-or-popover-target'),
        `after ${'click'} the $parent SHOULD be the tooltip-or-popover-target`);
    assert.ok($body.find('.ember-tooltip').length,
        `after ${'click'} the ember-tooltip SHOULD be rendered`);
}



export function assertShow(assert, context) {

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'false',
    'Should show tooltip');

  assert.equal(context.$().find('.ember-tooltip').attr('data-tether-enabled'), 'true',
    'Should enable tether');

}

export function assertHide(assert, context) {

  assert.equal(context.$().find('.ember-tooltip').attr('aria-hidden'), 'true',
    'Should hide tooltip');

  assert.equal(context.$().find('.ember-tooltip').attr('data-tether-enabled'), 'false',
    'Should disable tether');

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
