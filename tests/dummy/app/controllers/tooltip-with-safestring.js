import Ember from 'ember';

const SafeString = Ember.String.htmlSafe || Ember.Handlebars.SafeString;

export default Ember.Controller.extend({

  actions: {
    debugging() {
      this.transitionToRoute('index');
    },
  },

  safeString: new SafeString('this is a test'),

});
