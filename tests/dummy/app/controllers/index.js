import Ember from 'ember';

const {
  Controller,
  RSVP,
  run,
} = Ember;

export default Controller.extend({
  asyncContent: null,
  showTooltips: false,

  actions: {
    setAsyncContent() {
      return new RSVP.Promise((resolve) => {
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
