import $ from 'jquery';

export default function findTooltip(selector) {

  if (!selector) { // In case of passing null, undefined, etc
    selector = '.ember-tooltip, .ember-popover';
  }

  /* We .find() tooltips from $body instead of using ember-test-helper's
  find() method because tooltips and popovers are often rendered as
  children of <body> instead of children of the $targetElement */

  const $body = $(document.body);
  let $tooltip = $body.find(selector);

  if ($tooltip.length && $tooltip.hasClass('ember-tooltip-base')) {
    /* If what we find is the actually the tooltip component's element, we can
     * look up the intended tooltip by the element referenced by its target
     * element's aria-describedby attribute.
     */
    const $target = $tooltip.parents('.ember-tooltip-target, .ember-popover-target');
    $tooltip = $body.find(`#${$target.attr('aria-describedby')}`);
  }

  if ($tooltip.length && !$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
    throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
  } else if ($tooltip.length > 1) {
    console.warn(`getTooltipFromBody(): Multiple tooltips were found. Consider passing { selector: '.specific-tooltip-class' }`);
  }

  return $tooltip;
}
