import Ember from 'ember';

 const safeString = Ember.String.htmlSafe || Ember.Handlebars.SafeString;

export default Ember.Controller.extend({

  actions: {
    debugging() {
      this.transitionToRoute('index');
    },
  },

  safeString: new safeString('this is a test'),

});
