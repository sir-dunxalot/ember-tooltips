import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

const { computed, warn, run } = Ember;

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
        parentView.renderTooltip(this);
      } else {
        warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
      }
      
      this.remove();
    });
  },

});
