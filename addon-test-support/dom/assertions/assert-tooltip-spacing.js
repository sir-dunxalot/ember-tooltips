import { assert as emberAssert } from '@ember/debug';
import { getPositionDifferences } from 'ember-tooltips/test-support/dom';
import { validateSide } from 'ember-tooltips/test-support';

export default function assertTooltipSpacing(assert, options) {
  const { side, spacing } = options;

  validateSide(side, 'assertTooltipSpacing');

  if (typeof spacing !== 'number') {
    emberAssert(`You must pass spacing as a number like assertTooltipSpacing(assert, { side: 'top', spacing: 10 });`);
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
