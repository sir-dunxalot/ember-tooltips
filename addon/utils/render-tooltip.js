
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
  const tooltipContent = parsedOptions.content;
  const tooltipEvent = parsedOptions.event;
  const tooltipId = `tooltip-${tooltipIndex}`;
  const tooltipVisibilityIsManual = tooltipEvent === 'manual' || tooltipEvent === 'none';

  let $tooltip, tooltip;

  /**
  @method setTooltipVisibility
  @private
  */

  function setTooltipVisibility(shouldShow) {

    /* If we're setting visibility to the value
    it already is, do nothing... */

    if (!tooltip.hidden === shouldShow) {
      return;
    }

    /* Else, set the visbility */

    const { duration } = parsedOptions;
    const visibilityMethod = shouldShow ? 'show' : 'hide';

    tooltip[visibilityMethod](); // TODO  - set to hide and show
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

      /* Save timer ID for cancelling should an event
      hide the tooltop before the duration */

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

    /* Set the correct hide and show events */

    if (!newOptions.showOn) {
      if (tooltipEvent === 'hover') {
        newOptions.showOn = 'mouseenter';
      } else {
        newOptions.showOn = tooltipEvent;
      }
    }

    if (!newOptions.hideOn) {
      if (tooltipEvent === 'hover') {
        newOptions.hideOn = 'mouseleave';
      } else if (tooltipEvent === 'focus') {
        newOptions.hideOn = 'blur';
      } else if (tooltipEvent === 'ready') {
        newOptions.hideOn = null;
      } else {
        newOptions.hideOn = tooltipEvent;
      }
    }

    /* If duration is passed as a string, make it a number */

    if (newOptions.duration && typeof newOptions.duration === 'string') {
      let cleanDuration = parseInt(newOptions.duration, 10);

      /* Remove invalid parseInt results */

      if (isNaN(cleanDuration) || !isFinite(cleanDuration)) {
        cleanDuration = null;
      }

      newOptions.duration = cleanDuration;
    }

    /* Make sure content can be passed as a SafeString */

    if (newOptions.content instanceof SafeString) {
      newOptions.content = newOptions.content.toString();
    }

    return newOptions;
  }

  /* First, create the tooltip and set the variables */

  tooltip = new Tooltip(tooltipContent, parsedOptions);
  $tooltip = $(tooltip.element);

  tooltip.attach(domElement);

  if (!tooltipVisibilityIsManual) {
    const { showOn, hideOn } = parsedOptions;

    if (showOn !== 'none') {
      $domElement.on(parsedOptions.showOn, function() {
        setTooltipVisibility(true);
      });
    }

    if (showOn !== 'none') {
      $domElement.on(parsedOptions.hideOn, function() {
        setTooltipVisibility(false);
      });
    }
  }

  /* Hide and show the tooltip on focus and escape
  for acessibility */

  if (parsedOptions.event !== 'focus') {
    $domElement.focusin(function() {
      setTooltipVisibility(true);
    });

    $domElement.focusout(function() {
      setTooltipVisibility(false);
    });
  }

  $domElement.keydown(function(event) {
    if (event.which === 27) {
      setTooltipVisibility(false);
      event.preventDefault();

      return false;
    }
  });

  /* Setup ARIA attributes for acessibility */

  $tooltip.attr({
    id: tooltipId,
    role: 'tooltip',
  });

  $domElement.attr({
    // tabindex: $domElement.attr('tabindex') || '0',
    title: $domElement.attr('title') || tooltipContent.toString(),
  });

  tooltipIndex++;

  return tooltip;
}
