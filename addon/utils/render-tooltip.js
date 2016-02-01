
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

export default function renderTooltip(domElement, options, context) {

  Ember.assert('You must pass a DOM element as the first argument to the renderTooltip util', !domElement || (domElement && !!domElement.tagName));

  const $domElement = $(domElement);
  const parsedOptions = parseTooltipOptions(options);
  const { content, duration, event, hideOn, tabIndex, showOn } = parsedOptions;
  const tooltipId = `tooltip-${tooltipIndex}`;

  let $tooltip, tooltip;

  /**
  @method setTooltipVisibility
  @private
  */

  function setTooltipVisibility(shouldShow) {

    /* We debounce to avoid focus causing issues
    when showOn and hideOn are the same event */

    run.debounce(function() {

      /* If we're setting visibility to the value
      it already is, do nothing... */

      if (tooltip.hidden === shouldShow) {
        return;
      }

      if (context && context.isDestroying) {
        return;
      }

      /* Else, set the visbility */

      const visibilityMethod = shouldShow ? 'show' : 'hide';

      tooltip[visibilityMethod]();
      $tooltip.attr('aria-hidden', shouldShow);

      if (context) {
        context.set('tooltipVisibility', shouldShow);
      }

      if (shouldShow) {
        $domElement.attr('aria-describedby', tooltipId);
      } else {
        $domElement.removeAttr('aria-describedby');
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
    }, 150);
  }

  /**
  @method parseTooltipOptions
  @private

  Manipulate the options object
  */

  function parseTooltipOptions(options = {}) {
    const newOptions = options;
    const { content, duration, event, tabIndex, typeClass } = newOptions;

    /* Prefix type class */

    if (typeClass) {
      newOptions.typeClass = 'tooltip-' + typeClass;
    }

    /* Set the correct hide and show events */

    if (!newOptions.showOn) {
      if (event === 'hover') {
        newOptions.showOn = 'mouseenter';
      } else {
        newOptions.showOn = event;
      }
    }

    if (!newOptions.hideOn) {
      if (event === 'hover') {
        newOptions.hideOn = 'mouseleave';
      } else if (event === 'focus') {
        newOptions.hideOn = 'blur';
      } else if (event === 'ready') {
        newOptions.hideOn = null;
      } else {
        newOptions.hideOn = event;
      }
    }

    /* If duration is passed as a string, make it a number */

    if (duration && typeof duration === 'string') {
      let cleanDuration = parseInt(duration, 10);

      /* Remove invalid parseInt results */

      if (isNaN(cleanDuration) || !isFinite(cleanDuration)) {
        cleanDuration = null;
      }

      newOptions.duration = cleanDuration;
    }

    /* Make tab index a string */

    if (typeof tabIndex === 'number') {
      newOptions.tabIndex = tabIndex.toString();
    } else if (!tabIndex) {
      newOptions.tabIndex = '-1';
    }

    /* Make sure content can be passed as a SafeString */

    if (content instanceof SafeString) {
      newOptions.content = content.toString();
    }

    return newOptions;
  }

  /* First, create the tooltip and set the variables */

  tooltip = new Tooltip(content, parsedOptions);
  $tooltip = $(tooltip.element);

  tooltip.attach(domElement);

  if (event !== 'manual' && event !== 'none') {

    /* If show and hide are the same (e.g. click), toggle
    the visibility */

    if (showOn === hideOn) {
      $domElement.on(showOn, function() {
        setTooltipVisibility(!!tooltip.hidden);
      });
    } else {

      /* Else, add the show and hide events individually */

      if (showOn !== 'none') {
        $domElement.on(showOn, function() {
          setTooltipVisibility(true);
        });
      }

      if (hideOn !== 'none') {
        $domElement.on(hideOn, function() {
          setTooltipVisibility(false);
        });
      }
    }

    /* Hide and show the tooltip on focus and escape
    for acessibility */

    if (event !== 'focus') {
      $domElement.focusin(function() {
        setTooltipVisibility(true);
      });

      $domElement.focusout(function() {
        setTooltipVisibility(false);
      });
    }

    $domElement.keydown(function(keyEvent) {
      if (keyEvent.which === 27) {
        setTooltipVisibility(false);
        keyEvent.preventDefault();

        return false;
      }
    });
  }

  /* Setup ARIA attributes for acessibility */

  $tooltip.attr({
    id: tooltipId,
    role: 'tooltip',
  });

  $domElement.attr({
    tabindex: $domElement.attr('tabindex') || tabIndex,
    // title: $domElement.attr('title') || content.toString(), // Removed for #9
  });

  tooltipIndex++;

  return tooltip;
}
