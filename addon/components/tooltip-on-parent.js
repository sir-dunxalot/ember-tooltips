import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

export default Ember.Component.extend({
  layout: layout,

  registerOnParent: Ember.on('didInsertElement', function() {
    const parentView = this.get('parentView');

    if (parentView.renderTooltip) {
      parentView.renderTooltip(this);
    } else {
      Ember.warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
    }
  }),

});
