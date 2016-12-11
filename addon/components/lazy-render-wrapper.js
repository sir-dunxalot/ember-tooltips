import Ember from 'ember';
import layout from 'ember-tooltips/templates/components/lazy-render-wrapper';

const { computed, get, run, $ } = Ember;

// https://github.com/emberjs/rfcs/issues/168
// https://github.com/emberjs/ember.js/pull/12500
function getParent(view) {
  if (get(view, 'tagName') === '') {
    // Beware: use of private API! :(
    if (Ember.ViewUtils && Ember.ViewUtils.getViewBounds) {
      return $(Ember.ViewUtils.getViewBounds(view).parentElement);
    } else {
      return $(view._renderNode.contextualElement);
    }
  } else {
    return view.$().parent();
  }
}

// this const is also used in lazy-render-test.js
// to ensure each interaction type causes a render
export const INTERACTION_EVENT_TYPES = ['mouseenter', 'click', 'focusin'];

const PASSABLE_PROPERTIES = [
	'delayOnChange',
	'duration',
	'effect',
	'event',
	'hideOn',
	'keepInWindow',
	'side',
	'showOn',
	'spacing',
	'isShown',
	'tooltipIsVisible',
	'showDelay',
	'hideDelay',
	'target',
	'text',

	// non-publicized attributes
	'updateFor',
	'targetAttachment',
	'attachment',
	'role',
	'tabindex',
	'_shouldTargetGrandparentView',
];

const PASSABLE_ACTIONS = [
	'onDestroy',
	'onHide',
	'onRender',
	'onShow',

	// deprecated lifecycle actions
	'onTooltipDestroy',
	'onTooltipHide',
	'onTooltipRender',
	'onTooltipShow',
];

const PASSABLE_OPTIONS = PASSABLE_PROPERTIES.concat(PASSABLE_ACTIONS);

export default Ember.Component.extend({
	tagName: '',
	layout,

	passedPropertiesObject: computed(...PASSABLE_OPTIONS, function() {
		return PASSABLE_OPTIONS.reduce((passablePropertiesObject, key) => {
			// if a property has been declared by Component extension ( TooltipOnElement.extend )
			// or by handlebars instantiation ( {{tooltip-on-element}} ) then that property needs
			// to be passed from this wrapper to the lazy-rendered tooltip or popover component

			let value = this.get(key);

			if (!Ember.isNone(value)) {
				if (PASSABLE_ACTIONS.indexOf(key) >= 0) {
					// if a user has declared a lifecycle action property (onShow='someFunc')
					// then we must pass down the correctly-scoped action instead of value

					passablePropertiesObject[key] = () => this.sendAction(key);
				} else {
					passablePropertiesObject[key] = value;
				}
			}

			return passablePropertiesObject;
		}, {});
	}),

	enableLazyRendering: true,
	_hasUserInteracted: false,
	_hasRendered: false,
	_shouldRender: computed('isShown', 'tooltipIsVisible', 'enableLazyRendering', '_hasUserInteracted', function() {
		// if isShown, tooltipIsVisible, !enableLazyRendering, or _hasUserInteracted then
		// we return true and set _hasRendered to true because
		// there is never a scenario where this wrapper should destroy the tooltip

		if (this.get('_hasRendered')) {

			return true;

		} else if (this.get('isShown') || this.get('tooltipIsVisible')) {

			this.set('_hasRendered', true);
			return true;

		} else if (!this.get('enableLazyRendering')) {

			this.set('_hasRendered', true);
			return true;

		} else if (this.get('_hasUserInteracted')) {

			this.set('_hasRendered', true);
			return true;

		}

		return false;
	}),

	didInsertElement() {
		this._super(...arguments);

		if (this.get('_shouldRender')) {
			// if the tooltip _shouldRender then we don't need
			// any special $parent event handling
			return;
		}

		const $parent = getParent(this);

		INTERACTION_EVENT_TYPES.forEach((eventType) => {
			$parent.on(`${eventType}.lazy-ember-popover`, () => {
				if (this.get('_hasUserInteracted')) {
					$parent.off(`${eventType}.lazy-ember-popover`);
				} else {
					this.set('_hasUserInteracted', true);
					run.next(() => {
						$parent.trigger(eventType);
					});
				}
			});
		});
	},

	willDestroyElement() {
		this._super(...arguments);

		const $parent = getParent(this);
		INTERACTION_EVENT_TYPES.forEach((eventType) => {
			$parent.off(`${eventType}.lazy-ember-popover`);
		});
	},
});
