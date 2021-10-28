import {
  getPositionDifferences,
  validateSide,
} from 'ember-tooltips/test-support/jquery';

export default function assertTooltipSide(assert, options = {}) {
  const { side } = options;

  validateSide(side);

  const { expectedGreaterDistance, expectedLesserDistance } =
    getPositionDifferences(options);

  /* When the side is top or left, the greater number
  is the target's position. Thus, we check that the
  target's position is greater than the tooltip's
  position. */

  assert.ok(
    expectedGreaterDistance > expectedLesserDistance,
    `Tooltip should be on the ${side} side of the target`
  );
}
