import Ember from 'ember';

const { $, run } = Ember;

const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';
const tooltipOrPopoverTargetSelector = '.ember-tooltip-target, .ember-popover-target';

/**
@method getPositionDifferences
@param String side The side the tooltip should be on relative to the target

Given a side, which represents the side of the target that
the tooltip should render, this method identifies whether
the tooltip or the target should be further away from the
top left of the window.

For example, if the side is 'top' then the target should
be further away from the top left of the window than the
tooltip because the tooltip should render above the target.

If the side is 'right' then the tooltip should be further
away from the top left of the window than the target
because the tooltip should render to the right of the
target.

This method then returns an object with two numbers:

- `expectedGreaterDistance` (expected greater number given the side)
- `expectedLesserDistance` (expected lesser number given the side)

These numbers can be used for calculations like determining
whether a tooltip is on the correct side of the target or
determining whether a tooltip is the correct distance from
the target on the given side.
*/

function getPositionDifferences(options = {}) {
  const { targetPosition, tooltipPosition } = getTooltipAndTargetPosition(options);
  const { side } = options;

  const distanceToTarget = targetPosition[side];
  const distanceToTooltip = tooltipPosition[getOppositeSide(side)];
  const shouldTooltipBeCloserThanTarget = side === 'top' || side === 'left';
  const expectedGreaterDistance = shouldTooltipBeCloserThanTarget ? distanceToTarget : distanceToTooltip;
  const expectedLesserDistance = shouldTooltipBeCloserThanTarget ? distanceToTooltip : distanceToTarget;

  return { expectedGreaterDistance, expectedLesserDistance };
}

function getTooltipFromBody(selector = tooltipOrPopoverSelector) {
  // we have to .find() tooltips from $body because sometimes
  // tooltips and popovers are rendered as children of <body>
  // instead of children of the $targetElement

  const $body = $(document.body);
  const $tooltip = $body.find(selector) ;

  if (!$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
    throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
  } else if ($tooltip.length === 0) {
    throw Error('getTooltipFromBody(): No tooltips were found.');
  } else if ($tooltip.length > 1) {
    throw Error('getTooltipFromBody(): Multiple tooltips were found. Please provide an {option.selector = ".specific-tooltip-class"}');
  }

  return $tooltip;
}

function getTooltipTargetFromBody(selector = tooltipOrPopoverTargetSelector) {
  const $body = $(document.body);
  const $tooltipTarget = $body.find(selector) ;

  if ($tooltipTarget.length === 0) {
    throw Error('getTooltipTargetFromBody(): No tooltip targets were found.');
  } else if ($tooltipTarget.length > 1) {
    throw Error('getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}');
  }

  return $tooltipTarget;
}

function getOppositeSide(side) {
  switch (side) {
    case 'top': return 'bottom'; break;
    case 'right': return 'left'; break;
    case 'bottom': return 'top'; break;
    case 'left': return 'right'; break;
  }
}

function validateSide(side, testHelper = 'assertTooltipSide') {
  const sideIsValid = (
    side === 'top' ||
    side === 'right' ||
    side === 'bottom' ||
    side === 'left'
  );

  /* We make sure the side being tested is valid. We
  use Ember.assert because assert is passed in from QUnit */

  if (!sideIsValid) {
    Ember.assert(`You must pass side like ${testHelper}(assert, { side: 'top' }); Valid options for side are top, right, bottom, and left.`);
  }
}

function getTooltipAndTargetPosition(options = {}) {
  const $target = getTooltipTargetFromBody(options.targetSelector || tooltipOrPopoverTargetSelector);
  const targetPosition = $target[0].getBoundingClientRect();
  const $tooltip = getTooltipFromBody(options.selector || tooltipOrPopoverSelector);
  const tooltipPosition = $tooltip[0].getBoundingClientRect();

  return {
    targetPosition,
    tooltipPosition,
  };
}


/* TODO(Duncan): Document */

export function findTooltip(selector = tooltipOrPopoverSelector) {
  return getTooltipFromBody(selector);
}

/* TODO(Duncan): Document */

export function findTooltipTarget(selector = tooltipOrPopoverTargetSelector) {
  return getTooltipTargetFromBody(selector);
}

/* TODO(Duncan):

Update triggerTooltipTargetEvent() to use getTooltipTargetFromBody
and move side into the options hash */

export function triggerTooltipTargetEvent($element, type, options={}) {

  // TODO why do we allow focusin? why not just focus?
  const approvedEventTypes = ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur'];
  if (approvedEventTypes.indexOf(type) == -1) {
    throw Error(`only ${approvedEventTypes.join(', ')} will trigger a tooltip event. You used ${type}.`);
  }

  let wasEventTriggered = false;

  if (options.selector) {
    $element = getTooltipTargetFromBody(options.selector);
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

  assert.ok(isTooltipNotVisible,
      `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible and the tether should be disabled:
        isTooltipNotVisible -> ${isTooltipNotVisible}`);
}

export function assertTooltipVisible(assert, options={}) {
  const $tooltip = getTooltipFromBody(options.selector);
  const isTooltipVisible = $tooltip.attr('aria-hidden') == 'false';

  assert.ok(isTooltipVisible,
      `assertTooltipVisible(): the ember-tooltip should be visible and the tether should be enabled:
        isTooltipVisible -> ${isTooltipVisible}`);
}

export function assertTooltipSide(assert, options = {}) {
  const { side } = options;

  validateSide(side);

  const { expectedGreaterDistance, expectedLesserDistance } = getPositionDifferences(options);

  /* When the side is top or left, the greater number
  is the target's position. Thus, we check that the
  target's position is greater than the tooltip's
  position. */

  assert.ok(expectedGreaterDistance > expectedLesserDistance,
    `Tooltip should be on the ${side} side of the target`);
}

export function assertTooltipSpacing(assert, options) {
  const { side, spacing } = options;

  validateSide(side, 'assertTooltipSpacing');

  if (typeof spacing !== 'number') {
    Ember.assert(`You must pass spacing as a number like assertTooltipSpacing(assert, { side: 'top', spacing: 10 });`);
  }

  const { expectedGreaterDistance, expectedLesserDistance } = getPositionDifferences(options);
  const actualSpacing = Math.round(expectedGreaterDistance - expectedLesserDistance);

  /* When the side is top or left, the greater number
  is the target's position. Thus, we check that the
  target's position is greater than the tooltip's
  position. */

  const isSideCorrect = expectedGreaterDistance > expectedLesserDistance;
  const isSpacingCorrect = actualSpacing === spacing;

  assert.ok(isSideCorrect && isSpacingCorrect,
    `assertTooltipSpacing(): the tooltip should be in the correct position:
        - Tooltip should be on the ${side} side of the target: ${isSideCorrect}.
        - On the ${side} side of the target, the tooltip should be ${spacing}px from the target but it was ${actualSpacing}px`);
}

export function assertTooltipContent(assert, options = {}) {
  const { contentString } = options;

  if (Ember.isNone(contentString)) {
    Ember.assert('You must specify a contentString property in the options parameter');
  }

  const $tooltip = getTooltipFromBody(options.selector);
  const tooltipContent = $tooltip.text().trim();

  assert.equal(tooltipContent, contentString, `Content of tooltip (${tooltipContent}) matched expected (${contentString})`);
}
