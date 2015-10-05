import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    debugging() {
      this.transitionToRoute('index');
    },
  },

});
