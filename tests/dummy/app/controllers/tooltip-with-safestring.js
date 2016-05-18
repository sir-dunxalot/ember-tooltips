import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    debugging() {
      this.transitionToRoute('index');
    },

    toggle() {
      this.toggleProperty('toggle');
    },
  },

  safeString: new Ember.Handlebars.SafeString('this is a test'),

  toggle: true,

  safeStringToggle: Ember.computed('toggle', function() {
    let toggle = this.get('toggle');
    let safeString;

    if (toggle) {
      safeString = new Ember.Handlebars.SafeString('SafeString 1');
    } else {
      safeString = new Ember.Handlebars.SafeString('SafeString 2');
    }

    return safeString;
  }),
});
