/**
A utility to attach a tooltip to a DOM element.

@submodule utils
@method renderTooltip
@param {Element} domElement The DOM element, not jQuery element, to attach the tooltip to
@param {Object} options The tooltip options to render the tooltip with. For supported options, see the tooltipSupportedProperties array in the views initializer
*/

import Ember from 'ember';

const Tooltip = window.Tooltip;

export default function renderTooltip(domElement, options = {}) {
  const typeClass = options.typeClass;

  let tooltip;

  if (typeClass) {
    options.typeClass = 'tooltip-' + typeClass;
  }

  if (!options.event) {
    options.event = 'hover';
  }

  tooltip = new Tooltip(options.content, options);

  tooltip.attach(domElement);

  Ember.$(domElement)[options.event](function() {
    tooltip.toggle();
  });

  return tooltip;
}
