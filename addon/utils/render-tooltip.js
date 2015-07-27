/**
A utility to attach a tooltip to a DOM element.

@submodule utils
@method renderTooltip
@param {Element} domElement The DOM element, not jQuery element, to attach the tooltip to
@param {Object} options The tooltip options to render the tooltip with. For supported options, see the tooltipSupportedProperties array in the views initializer
*/

import Ember from 'ember';

const Tooltip = window.Tooltip;

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

  tooltip = new Tooltip(options.content, options);

  tooltip.attach(domElement);

  if (options.event !== 'manual') {
    Ember.$(domElement)[options.event](function() {
      const willShow = tooltip.hidden;

      tooltip.toggle();

      // Clean previously queued removal (if present)
      Ember.run.cancel(tooltip._hideTimer);
      if (willShow && options.duration) {
        // Hide tooltip after specified duration
        let hideTimer = Ember.run.later(function() {
          tooltip.hide();
        }, options.duration);
        // Save timer id for cancelling
        tooltip._hideTimer = hideTimer;
      }
    });
  }

  return tooltip;
}
