import Ember from 'ember';

const { computed } = Ember;

export const onComponentTarget = computed(function() {
  const parentView = this.get('parentView');

  if (!parentView) {
    console.warn('No parentView found');

    return null;
  } else {
    return `#${parentView.get('elementId')}`;
  }
});
