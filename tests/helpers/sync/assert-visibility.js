var TARGET_CLASS = 'ember-tooltip-or-popover-target';
var TARGET_SELECTOR = `.${TARGET_CLASS}`;
var TOOLTIP_OR_POPOVER_SELECTORS = '.ember-tooltip, .ember-popover';

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

  let $tooltip = context.$().parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS);

  assert.equal($tooltip.attr('aria-hidden'), 'false', 'Should show popover');

  assert.equal($tooltip.attr('data-tether-enabled'), 'true', 'Should enable tether');

}

export function assertHide(assert, context) {

  let $tooltip = context.$().parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS);

  assert.equal($tooltip.attr('aria-hidden'), 'true', 'Should hide tooltip');

  assert.equal($tooltip.attr('data-tether-enabled'), 'false', 'Should disable tether');

}

export function assertPopoverShow(assert, context) {

  let $popover = context.$().parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS);

  assert.equal($popover.attr('aria-hidden'), 'false', 'Should show popover');

  assert.equal($popover.attr('data-tether-enabled'), 'true', 'Should enable tether');

}

export function assertPopoverHide(assert, context) {

  let $popover = context.$().parents('body').find(TOOLTIP_OR_POPOVER_SELECTORS);

  assert.equal($popover.attr('aria-hidden'), 'true', 'Should hide popover');

  assert.equal($popover.attr('data-tether-enabled'), 'false', 'Should disable tether');

}
