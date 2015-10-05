import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['inline-block'],

  click() {
    if (this.get('action')) {
      this.sendAction('action');
    }
  }
});
