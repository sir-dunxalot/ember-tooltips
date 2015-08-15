import Ember from 'ember';
import ENV from '../config/environment';
import Tooltips from '../mixins/components/tooltips';

/* This is in the app tree so we can access ENV */

export function initialize() {
  const defaultOptions = {
    addTo: ['Component'],
  };
  const overridingOptions = ENV.tooltips || {};
  const options = Ember.merge(defaultOptions, overridingOptions);

  /* TODO - Needs test coverage for addTo */

  if (Ember.typeOf(options.addTo) === 'array') {
    options.addTo.forEach(function(className) {
      Ember[className].reopen(Tooltips);
    });
  }
}

export default {
  name: 'ember-tooltips',
  initialize: initialize
};
