import Ember from 'ember';
import layout from '../templates/components/ember-tooltip-simple';

const { computed } = Ember;

export default Ember.Component.extend({
  text: null,
  side: 'right',
  spacing: 10,
  layout,

  wormholeId: computed('elementId', function() {
    return `${this.get('elementId')}_wormhole`;
  }),

  _renderWormholeInPlace: true,
  _tooltip: null,

  createTooltip() {
    const tooltipContent = this.get('text') || ' ';
    const tooltip = new Tooltip(this.element.parentNode, {
      html: true,
      offset: this.get('spacing'),
      placement: this.get('side'),
      title: tooltipContent,
      template: `<div class="tooltip ember-tooltip" role="tooltip">
                  <div class="tooltip-arrow ember-tooltip-arrow"></div>
                  <div class="tooltip-inner" id="${this.get('wormholeId')}"></div>
                 </div>`,
      popperOptions: {
        onCreate: () => {
          console.log('ok');
          this.set('_renderWormholeInPlace', false);
          // this.get('_tooltip').popperInstance.update();
        },
      },
    });

    this.set('_tooltip', tooltip);
    // this.show();
  },

  didInsertElement() {
    this.createTooltip();
  },

  show() {
    this.get('_tooltip').show();
  },

});
