import Ember from 'ember';

export default Ember.Mixin.create({
  attributeBindings: ['aria-describedby'],
  'aria-describedby': null,
  tooltip: null,

  actions: {
    registerTooltip(tooltip) {
      this.set('tooltip', tooltip);
      this.set('aria-describedby', `#${tooltip.get('elementId')}`);
    }
  },

});
