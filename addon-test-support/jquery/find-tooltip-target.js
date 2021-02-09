/* eslint-disable ember/no-jquery */
import $ from 'jquery';

export default function findTooltipTarget(selector) {
  if (!selector) {
    // In case of passing null, undefined, etc
    selector = '.ember-tooltip-target, .ember-popover-target';
  }

  const $body = $(document.body);
  const $tooltipTarget = $body.find(selector);

  if ($tooltipTarget.length === 0) {
    throw Error('getTooltipTargetFromBody(): No tooltip targets were found.');
  } else if ($tooltipTarget.length > 1) {
    throw Error(
      'getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}'
    );
  }

  return $tooltipTarget;
}
