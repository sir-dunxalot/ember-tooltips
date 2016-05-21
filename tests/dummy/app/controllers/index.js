import Ember from 'ember';

const { run } = Ember;

export default Ember.Controller.extend({
  showTooltips: false,

  init() {
    run.scheduleOnce('afterRender', () => {
      run.later(() => {
        this.set('showTooltips', true);
      }, 1000);
    });
  }

});
