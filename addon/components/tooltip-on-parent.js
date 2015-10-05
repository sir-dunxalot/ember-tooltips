import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

const { computed, on, warn } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  layout,

  style: computed(function() {
    return Ember.String.htmlSafe('display:none;');
  }),

  registerOnParent: on('didInsertElement', function() {
    const parentView = this.get('parentView');

    if (parentView.renderTooltip) {
      parentView.renderTooltip(this);
    } else {
      warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
    }

    this.remove();
  }),

});
