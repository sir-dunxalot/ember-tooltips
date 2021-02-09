export function findTooltipTarget(selector) {
  if (!selector) {
    // In case of passing null, undefined, etc
    selector = '.ember-tooltip-target, .ember-popover-target';
  }

  const { body } = document;
  const tooltipTarget = body.querySelectorAll(selector);

  if (tooltipTarget.length === 0) {
    throw new Error(
      'ember-tooltips/test-support/dom/find-tooltip-target: No tooltip targets were found.'
    );
  } else if (tooltipTarget.length > 1) {
    throw new Error(
      'ember-tooltips/test-support/dom/find-tooltip-target: Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}'
    );
  }

  return tooltipTarget[0];
}

export default findTooltipTarget;
