import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('andThenAfterRender',
  function(app, callback) {
    andThen(function() {
      Ember.run.scheduleOnce('afterRender', this, callback);
    });
  }
);
