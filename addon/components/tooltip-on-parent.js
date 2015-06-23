import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

export default Ember.Component.extend({
  layout: layout,

  registerOnParent: Ember.on('didInsertElement', function() {
    this.get('parentView').renderTooltip(this);
  }),

});
