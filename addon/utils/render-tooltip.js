
import Ember from 'ember';

const { Tooltip } = window;
const { $, run, Handlebars: { SafeString } } = Ember;

let tooltipIndex = 1;

/**
A utility to attach a tooltip to a DOM element.

@submodule utils
@method renderTooltip
@param {Element} domElement The DOM element, not jQuery element, to attach the tooltip to
@param {Object} options The tooltip options to render the tooltip with
*/

export default function renderTooltip(domElement = {}, options = {}) {

  Ember.assert('You must pass a DOM element as the first argument to the renderTooltip util', !!domElement.tagName);

  const $domElement = $(domElement);
  const parsedOptions = parseTooltipOptions(options);
  const tooltipId = `tooltip-${tooltipIndex}`;

  let $tooltip, tooltip;

  /**
  @method toggleTooltipVisibility
  @private
  */

  function toggleTooltipVisibilty(shouldShow) {
    const { duration } = parsedOptions;

    tooltip.toggle();
    $tooltip.attr('aria-hidden', shouldShow);

    if (shouldShow) {
      $domElement.attr('aria-describedby', tooltipId);
    }

    /* Clean previously queued removal (if present) */

    run.cancel(tooltip._hideTimer);

    if (shouldShow && duration) {

      /* Hide tooltip after specified duration */

      const hideTimer = run.later(function() {
        tooltip.hide();
      }, duration);

      /* Save timer ID for cancelling */

      tooltip._hideTimer = hideTimer;
    }
  }

  /**
  @method parseTooltipOptions
  @private

  Manipulate the options object
  */

  function parseTooltipOptions(options = {}) {
    const newOptions = options;
    const { typeClass } = newOptions;

    /* Prefix type class */

    if (typeClass) {
      newOptions.typeClass = 'tooltip-' + typeClass;
    }

    /* Add a default event if none exists */

    if (!newOptions.event) {
      newOptions.event = 'hover';
    }


    if (newOptions.duration && typeof newOptions.duration === 'string') {
      let cleanDuration = parseInt(newOptions.duration, 10);

      /* Remove invalid parseInt results */

      if (isNaN(cleanDuration) || !isFinite(cleanDuration)) {
        cleanDuration = null;
      }

      newOptions.duration = cleanDuration;
    }

    if (newOptions.content instanceof SafeString) {
      newOptions.content = newOptions.content.toString();
    }

    return newOptions;
  }

  /* Now set up the tooltip options and render the tooltip */

  const tooltipContent = parsedOptions.content;

  /* Ensure Ember's SafeStrings work */

  tooltip = new Tooltip(tooltipContent, parsedOptions); // Create tooltip
  $tooltip = $(tooltip.element);

  tooltip.attach(domElement);

  if (parsedOptions.event !== 'manual') {
    $domElement[parsedOptions.event](function() {
      toggleTooltipVisibilty(tooltip.hidden);
    });
  }

  /* Hide and show the tooltip on focus and escape */

  $domElement.focusin(function() {
    toggleTooltipVisibilty(true);
  });

  $domElement.focusout(function() {
    toggleTooltipVisibilty(false);
  });

  $domElement.keydown(function(event) {
    if (event.which === 27) {
      toggleTooltipVisibilty(false);
      event.preventDefault();

      return false;
    }
  });

  /* Setup acessibility */

  $tooltip.attr({
    id: tooltipId,
    role: 'tooltip',
  });

  $domElement.attr({
    tabindex: $domElement.attr('tabindex') || '0',
    title: $domElement.attr('title') || tooltipContent.toString(),
  });

  tooltipIndex++;

  return tooltip;
}
