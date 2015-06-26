import Ember from 'ember';
import selectorFor from '../selector-for';

/* like click() but runs asyncrously allowing you to
use it outside of an andThen function with the same
stuff in the DOM */

export default Ember.Test.registerAsyncHelper('mouseOver',
  function(app, name) {
    triggerEvent(selectorFor(name), 'mouseover');
  }
);
