import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

const { computed, warn, run, get } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  layout,

  style: computed(function() {
    return Ember.String.htmlSafe('display:none;');
  }),

  init(...args) {
    this._super(args);

    run.schedule('afterRender', () => {
      const parentView = this.get('parentView');

      if (parentView.renderTooltip) {
        const parentHasSelector = get(parentView, 'tagName') ? true : false;
        const domTarget = get(parentView, 'domTarget');
        const target = parentHasSelector ? parentView : domTarget;
        target.renderTooltip(this);
      } else {
        warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
      }

      this.remove();
    });
  },

});
