import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { later, scheduleOnce } from '@ember/runloop';

export default Controller.extend({
  asyncContent: null,
  showTooltips: false,

  actions: {
    setAsyncContent() {
      return new RSVP.Promise((resolve) => {
        later(() => {
          this.set('asyncContent', 'Some model');
          resolve();
        }, 2000);
      });
    },
  },

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', () => {
      later(() => {
        this.set('showLogoTooltip', true);
      }, 1000);
    });
  },

});
