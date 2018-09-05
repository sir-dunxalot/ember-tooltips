import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { run } from '@ember/runloop';

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
    this._super(...arguments);

    run.scheduleOnce('afterRender', () => {
      run.later(() => {
        this.set('showLogoTooltip', true);
      }, 1000);
    });
  },

});
