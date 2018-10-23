/* These isElement________ functions are used to determine where an element
is in relation to the $popover and the $target elements. This is needed to
handle the visible state when a user interacts with any of these elements.
*/

/**
 * Determines if element is $popover or contained within $popover
 *
 * @method isElementInPopover
 * @param {DOM element} element
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementInPopover(element, popover) {
  if (!popover) {
    return false;
  }

  return popover === element || !!popover.querySelectorAll(element).length;
}

/**
 * Determines if the element is $target or (in $target and not
 * contained within $popover)
 *
 * @method isElementInTargetAndNotInPopover
 * @param {DOM element} element
 * @param {jQuery element} $target
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementInTargetAndNotInPopover(element, target, popover) {
  if (!target || !popover) {
    return false;
  }

  if (target.is(element)) {
    return true;
  }

  return !!target.querySelectorAll(element).length && !isElementInPopover(element, popover);
}

/**
 * Determines if element is not $popover, not $target, and
 * not contained within either.
 *
 * @method isElementElsewhere
 * @param {DOM element} element
 * @param {jQuery element} $target
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementElsewhere(element, target, popover) {
  const isElementOutsidePopover = !isElementInPopover(element, popover);
  const isElementOutsideTarget = !isElementInTargetAndNotInPopover(element, target, popover);

  return isElementOutsideTarget && isElementOutsidePopover;
}
