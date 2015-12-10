import Ember from 'ember';
import selectorFor from '../selector-for';

/* like click() but runs asyncrously allowing you to
use it outside of an andThen function with the same
stuff in the DOM */

export default Ember.Test.registerAsyncHelper('mouseOut',
  function(app, name) {
    const selector = selectorFor(name);
    const $element = inspect(name);
    const $tooltips = Ember.$('.tooltip');

    let elementExists = $element.length;

    triggerEvent(selector, 'mouseout');

    /* Wait until the element is removed to continue the tests */

    if ($tooltips.length) {
      $tooltips[0].addEventListener('DOMNodeRemovedFromDocument', function() {
        Ember.run(function() {
          elementExists = false;
        });
      });
    } else {
      elementExists = false;
    }

    Ember.Test.registerWaiter(function() {
      return !elementExists;
    });
  }
);
