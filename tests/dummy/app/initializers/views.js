import Ember from 'ember';

export function initialize(/* container, application */) {

  Ember.View.reopen({
    attributeBindings: ['data-test'],
    'data-test': null,
  });

}

export default {
  name: 'views',
  initialize: initialize
};
