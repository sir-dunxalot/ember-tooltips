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
    triggerEvent(selector, 'mouseleave');
    triggerEvent(selector, 'mouseoff');
    triggerEvent(selector, 'blur');

    /* Wait until the element is removed to continue the tests */

    $element.on('remove', function() {
      elementExists = false;
    });

    return Ember.Test.registerWaiter(function() {
      return !elementExists;
    });
  }
);
