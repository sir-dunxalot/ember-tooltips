import Ember from 'ember';
import ENV from '../config/environment';
import Tooltips from '../mixins/components/tooltips';

/* This is in the app tree so we can access ENV */

export function initialize(container, application) {
  const defaultOptions = {
    addTo: ['Component', 'View'],
    disableInitializer: true,
  };
  const overridingOptions = ENV.tooltips || {};
  const options = Ember.merge(defaultOptions, overridingOptions);

  /* TODO - Needs test coverage */

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
