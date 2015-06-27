import Ember from 'ember';

export function initialize(/* container, application */) {

  Ember.Component.reopen({
    attributeBindings: ['data-test'],
    'data-test': null,
  });

}

export default {
  name: 'components',
  initialize: initialize
};
