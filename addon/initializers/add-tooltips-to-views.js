import Ember from 'ember';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';



export function initialize(/* container, application */) {

  Ember.View.reopen({

    /* The tooltip object */

    tooltip: null,

    /* Tooltip options - see http://darsa.in/tooltip/ */

    tooltipAuto: true,
    tooltipClass: null,
    tooltipContent: null,
    tooltipEffect: 'slide', // fade, grow, slide, null
    tooltipEvent: 'hover',
    tooltipPlace: 'top',
    tooltipSpacing: null,

    renderTooltip: Ember.on('didInsertElement', function() {
      const tooltipContent = this.get('tooltipContent');

      let tooltip;

      if (!tooltipContent) {
        return;
      }

      tooltip = renderTooltip(this.get('element'), {
        auto: this.get('tooltipAuto'),
        content: tooltipContent,
        effectClass: this.get('tooltipEffect'),
        place: this.get('tooltipPlace'),
        spacing: this.get('tooltipSpacing'),
        typeClass: this.get('tooltipClass'),
      });

      this.set('tooltip', tooltip);
    }),

    renderChildTooltips: function() {
      Ember.run.scheduleOnce('render', this, function() {
        this.$().find('.tooltip').each(function() {
          $element = $(this);

          tooltip = renderTooltip(this, {
            auto: $element.data('tooltip-auto'),
            content: $element.data('tooltip-content'),
            effectClass: $element.data('tooltip-effect'),
            place: $element.data('tooltip-place'),
            spacing: $element.data('tooltip-spacing'),
            typeClass: $element.data('tooltip-class'),
          });

        });
      });
    },

  });

}

export default {
  name: 'add-tooltips-to-views',
  initialize: initialize
};
