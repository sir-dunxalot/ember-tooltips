import Ember from 'ember';

const Tooltip = window.Tooltip;

export function initialize(/* container, application */) {

  Ember.View.reopen({
    tooltip: null,
    tooltipAuto: true,
    tooltipClass: null,
    tooltipContent: null,
    tooltipEffect: 'slide', // fade, grow, slide, null
    tooltipPlace: 'top',
    tooltipSpacing: null,

    renderTooltip: Ember.on('didInsertElement', function() {
      const element = this.get('element');
      const tooltipContent = this.get('tooltipContent');

      let tooltip;

      if (!tooltipContent) {
        return;
      }

      tooltip = new Tooltip(Ember.String.capitalize(tooltipContent), {
        auto: this.get('tooltipAuto'),
        effectClass: this.get('tooltipEffect'),
        place: this.get('tooltipPlace'),
        spacing: this.get('tooltipSpacing'),
        typeClass: 'tooltip-' + this.get('tooltipClass'),
      });

      this.set('tooltip', tooltip);

      tooltip.attach(element);

      this.$().hover(function() {
        tooltip.toggle();
      });
    }),

  });

}

export default {
  name: 'add-tooltips-to-views',
  initialize: initialize
};
