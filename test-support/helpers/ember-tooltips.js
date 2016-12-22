import Ember from 'ember';

const { $, run } = Ember;

const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';
const tooltipOrPopoverTargetSelector = '.ember-tooltip-or-popover-target';

const getTooltipFromBody = function(selector=tooltipOrPopoverSelector) {
  // we have to .find() tooltips from $body because sometimes
  // tooltips and popovers are rendered as children of <body>
  // instead of children of the $targetElement

  const $body = $(document.body);
  const $tooltip = $body.find(selector) ;

  if (!$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
    throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
  } else if ($tooltip.length > 1) {
    throw Error('getTooltipFromBody(): Multiple tooltips were found. Please provide an {option.selector = ".specific-tooltip-class"}');
  }

  return $tooltip;
}

const getTooltipTargetFromBody = function(selector = tooltipOrPopoverTargetSelector) {
  const $body = $(document.body);
  const $tooltipTarget = $body.find(selector) ;

  if ($tooltipTarget.length > 1) {
    throw Error('getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}');
  }

  return $tooltipTarget;
}

export function triggerTooltipTargetEvent($element, type, options={}) {

  // TODO why do we allow focusin? why not just focus?
  const approvedEventTypes = ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur'];
  if (approvedEventTypes.indexOf(type) == -1) {
    throw Error(`only ${approvedEventTypes.join(', ')} will trigger a tooltip event. You used ${type}.`);
  }

  let wasEventTriggered = false;

  if (options.selector) {
    $element = $element.find(options.selector);
  }

  // we need to need to wrap any code with asynchronous side-effects in a run
  // $tooltipTarget.trigger('someEvent') has asynchronous side-effects
  run(() => {
    // if the $tooltip is hidden then the user can't interact with it
    if ($element.attr('aria-hidden') === 'true') {
      return;
    }
    if (type === 'focus' || type === 'blur') {
      // we don't know why but this is necessary when type is 'focus' or 'blur'
      $element[0].dispatchEvent(new window.Event(type));
    } else {
      $element.trigger(type);
    }

    wasEventTriggered = true;
  });

  return wasEventTriggered;
}

export function assertTooltipNotRendered(assert, options={}) {
  const $body = $(document.body);
  const $tooltip = $body.find(options.selector || tooltipOrPopoverSelector);

  assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
}

export function assertTooltipRendered(assert, options={}) {
  const $tooltip = getTooltipFromBody(options.selector);

  assert.equal($tooltip.length, 1, 'assertTooltipRendered(): the ember-tooltip should be rendered');
}

export function assertTooltipNotVisible(assert, options={}) {
  const $tooltip = getTooltipFromBody(options.selector);
  const isTooltipNotVisible = $tooltip.attr('aria-hidden') == 'true';
  const isTooltipTetherDisabled = $tooltip.attr('data-tether-enabled') == 'false';

  assert.ok(isTooltipNotVisible && isTooltipTetherDisabled,
      `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible and the tether should be disabled:
        isTooltipNotVisible -> ${isTooltipNotVisible} ;
        isTooltipTetherDisabled -> ${isTooltipTetherDisabled}`);
}

export function assertTooltipVisible(assert, options={}) {
  const $tooltip = getTooltipFromBody(options.selector);
  const isTooltipVisible = $tooltip.attr('aria-hidden') == 'false';
  const isTooltipTetherEnabled = $tooltip.attr('data-tether-enabled') == 'true';

  assert.ok(isTooltipVisible && isTooltipTetherEnabled,
      `assertTooltipVisible(): the ember-tooltip should be visible and the tether should be enabled:
        isTooltipVisible -> ${isTooltipVisible} ;
        isTooltipTetherEnabled -> ${isTooltipTetherEnabled}`);
}

export function assertTooltipSide(assert, options = {}) {
  const { side } = options;

  const sideIsValid = (
    side === 'top' ||
    side === 'right' ||
    side === 'bottom' ||
    side === 'left'
  );

  /* We make sure the side being tested is valid. We
  use Ember.assert because assert is passed in from QUnit */

  if (!sideIsValid) {
    Ember.assert(`You must pass side like assertTooltipSide(assert, { side: 'top' }); Valid options for side are top, right, bottom, and left.`);
  }

  const expectedSide = options.side || 'top';
  const $target = getTooltipTargetFromBody(options.targetSelector);
  const targetPosition = $target[0].getBoundingClientRect();
  const $tooltip = getTooltipFromBody(options.selector);
  const tooltipPosition = $tooltip[0].getBoundingClientRect();

  if (expectedSide === 'top') {
    assert.ok(targetPosition.top > tooltipPosition.bottom,
      'Tooltip should be above the target');
  } else if (expectedSide === 'right') {
    assert.ok(targetPosition.right < tooltipPosition.left,
      'Tooltip should be right of the target');
  } else if (expectedSide === 'bottom') {
    assert.ok(targetPosition.bottom < tooltipPosition.top,
      'Tooltip should be below the target');
  } else if (expectedSide === 'left') {
    assert.ok(targetPosition.left > tooltipPosition.right,
      'Tooltip should be left of the target');
  }
}
