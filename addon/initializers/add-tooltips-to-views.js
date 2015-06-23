import Ember from 'ember';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

export function initialize(/* container, application */) {

  Ember.View.reopen({

    /* The tooltip object */

    tooltip: null,

    /* Tooltip options - see http://darsa.in/tooltip/ */

    tooltipAuto: true,
    tooltipTypeClass: null,
    tooltipContent: null,
    tooltipEffectClass: 'slide', // fade, grow, slide, null
    tooltipEvent: 'hover',
    tooltipPlace: 'top',
    tooltipSpacing: null,

    renderTooltip: Ember.on('didInsertElement', function(maybeTooltipComponent) {
      const componentWasPassed = Ember.typeOf(maybeTooltipComponent) === 'instance';
      const component = componentWasPassed ? maybeTooltipComponent : Ember.Object.create({});
      const content = component.get('content') || component.get('element') || this.get('tooltipContent');
      const properties = ['auto', 'effectClass', 'place', 'spacing', 'typeClass'];

      let tooltip, tooltipOptions;

      if (!content) {
        return;
      }

      tooltipOptions = {
        content
      };

      properties.forEach(function(property) {
        const capitalizedProperty = Ember.String.capitalize(property);

        tooltipOptions[property] = component.get(property) || this.get(`tooltip${capitalizedProperty}`);
      }, this);

      tooltip = renderTooltip(this.get('element'), tooltipOptions);

      this.set('tooltip', tooltip);
    }),

    renderChildTooltips: function() {
      Ember.run.scheduleOnce('render', this, function() {
        this.$().find('.tooltip').each(function() {
          const $element = Ember.$(this);

          renderTooltip(this, {
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
