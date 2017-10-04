import Ember from 'ember';
import layout from '../templates/components/ember-tooltip-simple';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['ember-tooltip-creator'],
  text: null,
  side: 'right',
  spacing: 10,
  layout,

  /* Actions */

  onDestroy: null,
  onHide: null,
  onRender: null,
  onShow: null,

  wormholeId: computed('elementId', function() {
    return `${this.get('elementId')}_wormhole`;
  }),

  _renderWormholeInPlace: true,
  _tooltip: null,

  createTooltip() {
    const parentNode = this.element.parentNode;
    const tooltipContent = this.get('text') || '<span></span>';
    const tooltip = new Tooltip(parentNode, {
      container: parentNode,
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
          this.sendAction('onRender', this);

          this.set('_renderWormholeInPlace', false);
        },
      },
    });

    this.set('_tooltip', tooltip);
  },

  didInsertElement() {
    this._super(...arguments);

    this.createTooltip();
  },

  show() {
    this.get('_tooltip').show();
  },

});
