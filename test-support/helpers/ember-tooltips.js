import Test from 'ember-test';

export default function() {
  Test.registerAsyncHelper('nameOfEvent', function(app) {

  });
}

/*
Private helpers to trigger native events

Borrowed from Ember power select:
https://github.com/cibernox/ember-power-select/blob/25a7cd79d6065d4e85e6b4df69eec63e28d570ec/test-support/helpers/ember-power-select.js
*/

function fireNativeMouseEvent(eventType, selectorOrDomElement, options = {}) {
  let event;
  try {
    event = new window.Event(eventType, { bubbles: true, cancelable: true, view: window });
  } catch (e) {
    // fix IE11: "Object doesn't support this action"
    event = document.createEvent('Event');
    let bubbles = true;
    let cancelable = true;
    event.initEvent(eventType, bubbles, cancelable);
  }

  Object.keys(options).forEach((key) => event[key] = options[key]);
  let target;
  if (typeof selectorOrDomElement === 'string') {
    target = $(selectorOrDomElement)[0];
  } else {
    target = selectorOrDomElement;
  }
  run(() => target.dispatchEvent(event));
}

function nativeMouseDown(selectorOrDomElement, options) {
  fireNativeMouseEvent('mousedown', selectorOrDomElement, options);
}

function nativeMouseUp(selectorOrDomElement, options) {
  fireNativeMouseEvent('mouseup', selectorOrDomElement, options);
}

function triggerKeydown(domElement, k) {
  let oEvent = document.createEvent('Events');
  oEvent.initEvent('keydown', true, true);
  $.extend(oEvent, {
    view: window,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    keyCode: k,
    charCode: k
  });
  run(() => {
    domElement.dispatchEvent(oEvent);
  });
}

function nativeTouch(selectorOrDomElement) {
  let event = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
  let target;

  if (typeof selectorOrDomElement === 'string') {
    target = $(selectorOrDomElement)[0];
  } else {
    target = selectorOrDomElement;
  }
  run(() => target.dispatchEvent(event));
  run(() => {
    event = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    target.dispatchEvent(event);
  });
}
