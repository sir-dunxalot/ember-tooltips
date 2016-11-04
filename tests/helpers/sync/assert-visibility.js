const TARGET_CLASS = 'ember-tooltip-or-popover-target';
const TARGET_SELECTOR = `.${TARGET_CLASS}`;
const TOOLTIP_OR_POPOVER_SELECTORS = '.ember-tooltip, .ember-popover';

export function assertNotRendered(assert, context) {
  let $context = context.$();

  assert.notOk($context.hasClass(TARGET_CLASS) || $context.find(TARGET_SELECTOR).length,
      'the the $target SHOULD NOT have the tooltip-or-popover-target class');

  assert.notOk($context.parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS).length,
      'the ember-tooltip SHOULD NOT be rendered');
}

export function assertRendered(assert, context) {
  let $context = context.$();

  assert.ok($context.hasClass(TARGET_CLASS) || $context.find(TARGET_SELECTOR).length,
      'the the $target SHOULD have the tooltip-or-popover-target class');

  assert.ok($context.parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS).length,
      'the ember-tooltip SHOULD be rendered');
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
