import Ember from 'ember';

const { deprecate, computed, warn } = Ember;

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

export function dispatchAction(context, actionName) {
  const action = context.get(actionName);

  if (typeof action === 'string') {
    deprecate(`Use of '${actionName}' with an action name is deprecated. Please pass a closure action instead of '${action}'`, false, {
      id: 'ember-tooltips-send-action-use',
      until: '3.0.0',
    });
    context.sendAction(actionName, context); // eslint-disable-line ember/closure-actions
  } else if (action) {
    action(context);
  }
}
