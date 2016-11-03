import Ember from 'ember';

const { computed } = Ember;

export const onComponentTarget = computed(function() {

	// TODO write explanation
  const grandparentView = this.get('parentView.parentView');

  if (!grandparentView) {
    console.warn('No grandparentView found');

    return null;
  } else if (!grandparentView.get('elementId')) {
  	console.warn('No grandparentView.elementId');

  	return null;
  } else {
    return `#${grandparentView.get('elementId')}`;
  }
});
