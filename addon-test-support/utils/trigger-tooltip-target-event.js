import { triggerEvent } from '@ember/test-helpers';
import { findTooltipTarget } from 'ember-tooltips/test-support';

export default function triggerTooltipTargetEvent($element, type, options = {}) {

  const approvedEventTypes = [
    'mouseenter',
    'mouseleave',
    'click',
    'focus',
    'focusin',
    'focusout',
    'blur'
  ];

  if (approvedEventTypes.indexOf(type) == -1) {
    throw Error(`only ${approvedEventTypes.join(', ')} will trigger a tooltip event. You used ${type}.`);
  }

  if (options.selector) {
    $element = findTooltipTarget(options.selector);
  }

  /* If the $tooltip is hidden then the user can't interact with it */

  if ($element.attr('aria-hidden') === 'true') {
    return;
  }

  /* Acceptance tests don't like triggerEvent() for some reason */

  return triggerEvent($element[0], type); // supports `await triggerTooltipTargetEvent();`
}
