import Ember from 'ember';

const { run } = Ember;

export default Ember.Controller.extend({
  asyncContent: null,
  showTooltips: false,

  actions: {
    setAsyncContent() {
      return new Ember.RSVP.Promise((resolve) => {
        run.later(() => {
          this.set('asyncContent', 'Some model');
          resolve();
        }, 2000);
      });
    },
  },

  init() {
    run.scheduleOnce('afterRender', () => {
      run.later(() => {
        this.set('showLogoTooltip', true);
      }, 1000);
    });
  },

});
