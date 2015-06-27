import Ember from 'ember';

export default Ember.Component.extend({

  testRenderingInTemplate: Ember.on('didInsertElement', function() {
    this.renderChildTooltips();
  }),

});
