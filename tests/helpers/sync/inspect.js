import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('inspect',
  function(app, name, useJquery = true) {
    const [ element ] = find(selectorFor(name));

    if (useJquery) {
      return $(element);
    } else {
      return element;
    }
  }
);
