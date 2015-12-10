import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    debugging() {
      this.transitionToRoute('index');
    },
  },

  safeString: new Ember.Handlebars.SafeString('this is a test'),

});
