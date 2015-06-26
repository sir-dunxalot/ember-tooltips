import Ember from 'ember';
import selectorFor from '../selector-for';

/* like click() but runs asyncrously allowing you to
use it outside of an andThen function with the same
stuff in the DOM */

export default Ember.Test.registerAsyncHelper('mouseOut',
  function(app, name) {
    const selector = selectorFor(name);
    const $element = inspect(name);

    let elementExists = $element.length;

    triggerEvent(selector, 'mouseout');

    /* Wait until the element is removed to continue the tests */

    Ember.$('.tooltip')[0].addEventListener('DOMNodeRemovedFromDocument', function() {
      Ember.run(function() {
        elementExists = false;
      });
    });

    Ember.Test.registerWaiter(function() {
      return !elementExists;
    });
  }
);
