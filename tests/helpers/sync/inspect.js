import Ember from 'ember';
import selectorFor from '../selector-for';

export default Ember.Test.registerHelper('inspect',
  function(app, name, useJquery = true) {
    console.log('finding');
    const [ element ] = find(selectorFor(name)).toArray();
    // const [ element ] = ;
    console.log('running', element);

    if (useJquery) {
      return $(element);
    } else {
      return element;
    }
  }
);
