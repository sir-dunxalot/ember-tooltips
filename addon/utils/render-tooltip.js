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
