import {
  findTooltip,
  findTooltipTarget,
  getOppositeSide,
} from 'ember-tooltips/test-support/jquery';

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

export default function getPositionDifferences(options = {}) {
  const { targetPosition, tooltipPosition } =
    getTooltipAndTargetPosition(options);
  const { side } = options;

  const distanceToTarget = targetPosition[side];
  const distanceToTooltip = tooltipPosition[getOppositeSide(side)];
  const shouldTooltipBeCloserThanTarget = side === 'top' || side === 'left';
  const expectedGreaterDistance = shouldTooltipBeCloserThanTarget
    ? distanceToTarget
    : distanceToTooltip;
  const expectedLesserDistance = shouldTooltipBeCloserThanTarget
    ? distanceToTooltip
    : distanceToTarget;

  return { expectedGreaterDistance, expectedLesserDistance };
}

export function getTooltipAndTargetPosition(options = {}) {
  const { selector, targetSelector } = options;
  const [target] = findTooltipTarget(targetSelector);
  const [tooltip] = findTooltip(selector, { targetSelector });

  const targetPosition = target.getBoundingClientRect();
  const tooltipPosition = tooltip.getBoundingClientRect();

  return {
    targetPosition,
    tooltipPosition,
  };
}
