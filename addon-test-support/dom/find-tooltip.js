export function findTooltip(
  selectorOrElement,
  { targetSelector, multiple = false } = {}
) {
  if (!selectorOrElement) {
    // In case of passing null, undefined, etc
    selectorOrElement = '.ember-tooltip, .ember-popover';
  }

  /* We querySelect tooltips from body instead of using ember-test-helper's
  find() method because tooltips and popovers are often rendered as
  children of <body> instead of children of the targetElement */

  const { body } = document;
  let tooltips =
    typeof selectorOrElement === 'string'
      ? body.querySelectorAll(selectorOrElement)
      : [selectorOrElement];

  tooltips = [].slice
    .call(tooltips)
    .map((tooltip) => getActualTooltip(tooltip, targetSelector))
    .filter((el) => el);

  if (tooltips.length > 1) {
    console.warn(
      `ember-tooltips/test-support/dom/find-tooltip: Multiple tooltips were found. Consider passing a selector '.specific-tooltip-class'`
    );
  }

  if (multiple) {
    return tooltips;
  }

  let tooltip = tooltips[0];

  if (
    tooltip &&
    !tooltip.classList.contains('ember-tooltip') &&
    !tooltip.classList.contains('ember-popover')
  ) {
    throw new Error(
      `getTooltipFromBody(): returned an element that is not a tooltip`
    );
  }

  return tooltip;
}

export default findTooltip;

function getActualTooltip(tooltip, targetSelector) {
  if (tooltip && tooltip.classList.contains('ember-tooltip-base')) {
    /* If what we find is the actually the tooltip component's element, we can
     * look up the intended tooltip by the element referenced by its target
     * element's aria-describedby attribute.
     */
    const target = tooltip.closest(
      '.ember-tooltip-target, .ember-popover-target'
    );

    // If a targetSelector is specified, filter by it
    if (!target || (targetSelector && !target.matches(targetSelector))) {
      return null;
    }

    tooltip = document.getElementById(target.getAttribute('aria-describedby'));
  }

  return tooltip;
}
