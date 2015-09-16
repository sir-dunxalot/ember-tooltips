/**
A utility to attach a tooltip to a DOM element.

@submodule utils
@method renderTooltip
@param {Element} domElement The DOM element, not jQuery element, to attach the tooltip to
@param {Object} options The tooltip options to render the tooltip with
*/

import Ember from 'ember';

const Tooltip = window.Tooltip;
const { $, run } = Ember;

export default function renderTooltip(domElement = {}, options = {}) {
  const typeClass = options.typeClass;

  let tooltip;

  Ember.assert('You must pass a DOM element as the first argument to the renderTooltip util', !!domElement.tagName);

  if (typeClass) {
    options.typeClass = 'tooltip-' + typeClass;
  }

  if (!options.event) {
    options.event = 'hover';
  }

  if (options.duration && typeof options.duration === 'string') {
    options.duration = parseInt(options.duration, 10);

    /* Remove invalid parseInt results */

    if (isNaN(options.duration) || !isFinite(options.duration)) {
      options.duration = null;
    }
  }

  tooltip = new Tooltip(options.content, options);

  tooltip.attach(domElement);

  if (options.event !== 'manual') {
    $(domElement)[options.event](function() {
      const willShow = tooltip.hidden;

      tooltip.toggle();

      /* Clean previously queued removal (if present) */

      run.cancel(tooltip._hideTimer);

      if (willShow && options.duration) {

        /* Hide tooltip after specified duration */

        const hideTimer = run.later(function() {
          tooltip.hide();
        }, options.duration);

        /* Save timer ID for cancelling */

        tooltip._hideTimer = hideTimer;
      }
    });
  }

  return tooltip;
}
