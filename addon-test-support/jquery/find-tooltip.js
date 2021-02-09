/* eslint-disable ember/no-jquery */
import $ from 'jquery';

export default function findTooltip(selector, { targetSelector } = {}) {
  if (!selector) {
    // In case of passing null, undefined, etc
    selector = '.ember-tooltip, .ember-popover';
  }

  /* We .find() tooltips from $body instead of using ember-test-helper's
  find() method because tooltips and popovers are often rendered as
  children of <body> instead of children of the $targetElement */
  let $tooltips = $(document.body).find(selector);
  const tooltipElements = $tooltips
    .toArray()
    .map((el) => getActualTooltip(el, targetSelector))
    .filter((el) => el);
  $tooltips = $(tooltipElements);

  if (
    $tooltips.length &&
    !$tooltips.hasClass('ember-tooltip') &&
    !$tooltips.hasClass('ember-popover')
  ) {
    throw Error(
      `getTooltipFromBody(): returned an element that is not a tooltip`
    );
  } else if ($tooltips.length > 1) {
    console.warn(
      `getTooltipFromBody(): Multiple tooltips were found. Consider passing { selector: '.specific-tooltip-class' }`
    );
  }

  return $tooltips;
}

function getActualTooltip(tooltip, targetSelector) {
  let $tooltip = $(tooltip);

  if ($tooltip.hasClass('ember-tooltip-base')) {
    /* If what we find is the actually the tooltip component's element, we can
     * look up the intended tooltip by the element referenced by its target
     * element's aria-describedby attribute.
     */
    const $target = $tooltip.closest(
      '.ember-tooltip-target, .ember-popover-target'
    );

    // If a targetSelector is specified, filter by it
    if (!$target.length || (targetSelector && !$target.is(targetSelector))) {
      return null;
    }

    $tooltip = $(document.body).find(`#${$target.attr('aria-describedby')}`);
  }

  return $tooltip[0];
}
