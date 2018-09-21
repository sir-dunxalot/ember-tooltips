import $ from 'jquery';

export default function findTooltip(selector) {

  if (!selector) { // In case of passing null, undefined, etc
    selector = '.ember-tooltip, .ember-popover';
  }

  /* We .find() tooltips from $body instead of using ember-test-helper's
  find() method because tooltips and popovers are often rendered as
  children of <body> instead of children of the $targetElement */

  const $body = $(document.body);
  const $tooltip = $body.find(selector);

  if ($tooltip.length && !$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
    throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
  } else if ($tooltip.length > 1) {
    console.warn(`getTooltipFromBody(): Multiple tooltips were found. Consider passing { selector: '.specific-tooltip-class' }`);
  }

  return $tooltip;
}
