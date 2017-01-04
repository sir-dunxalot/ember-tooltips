import Ember from 'ember';

const { computed, warn } = Ember;

export const onComponentTarget = computed(function() {

  let targetView;

  if (this.get('_shouldTargetGrandparentView')) {

    /* The parentView is the lazy-render-wrapper
    and we want to ignore that tagless component
    */

    targetView = this.get('parentView.parentView');
  } else {
    targetView = this.get('parentView');
  }

  if (!targetView) {
    warn('No targetView found');

    return null;
  } else if (!targetView.get('elementId')) {
    warn('No targetView.elementId');

    return null;
  } else {
    return `#${targetView.get('elementId')}`;
  }
});
