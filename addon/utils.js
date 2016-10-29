import Ember from 'ember';

const { computed } = Ember;

export const onComponentTarget = computed(function() {
	// TODO make sure this is getting the correct parentView, might need grandParentView
  const parentView = this.get('parentView');

  if (!parentView) {
    console.warn('No parentView found');

    return null;
  } else {
    return `#${parentView.get('elementId')}`;
  }
});
