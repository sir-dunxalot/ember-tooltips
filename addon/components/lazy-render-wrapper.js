import Ember from 'ember';

// TODO const more things
const { get, $ } = Ember;

// https://github.com/emberjs/rfcs/issues/168
export default function getParent(view) {
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

export const INTERACTION_EVENT_TYPES = ['mouseenter', 'click', 'focusin'];

const PASSABLE_PROPERTIES = [
	'delay',
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
	'hideDelay',
	'target',

	// non-publicized attributes
	'updateFor',
	'targetAttachment',
	'attachment',
	'role',
	'tabindex',
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

	passedProperties: Ember.computed(...PASSABLE_OPTIONS, function() {
		// this will return an object of approved options attributes
		// which may be passed to this object

		// TODO write unit tests for passedProperties
		// TODO make PASSABLE_PROPERTIES an attribute on tooltip-on-element so people can pass thru whatever
		// TODO rename all of these things

		return PASSABLE_OPTIONS.reduce((passablePropertiesObject, propName) => {
			let passedProperty = this.get(propName);

			if (!Ember.isNone(passedProperty)) {
				if (PASSABLE_ACTIONS.indexOf(propName) >= 0) {
					/* if a user has declared an action like onShow='someFunc'
					then we must pass down the correctly-scoped action instead of the string */

					this.set(propName, passedProperty);
					passablePropertiesObject[propName] = () => this.sendAction(propName);
				} else {
					passablePropertiesObject[propName] = passedProperty;
				}
			}

			return passablePropertiesObject;
		}, {});
	}),

	enableLazyRendering: false, // TODO add docs for this
	_hasUserInteracted: false,
	_hasRendered: false,
	_shouldRender: Ember.computed('isShown', 'tooltipIsVisible', 'enableLazyRendering', '_hasUserInteracted', function() {
		// if isShown, tooltipIsVisible, !enableLazyRendering, or _hasUserInteracted then
		// we return true and change _shouldRender from a computed property to a boolean.
		// We do this because there is never a scenario where this wrapper should destroy the tooltip

		const returnTrueAndEnsureAlwaysRendered = () => {
			this.set('_shouldRender', true);
			return true;
		};

		if (this.get('isShown') || this.get('tooltipIsVisible')) {

			return returnTrueAndEnsureAlwaysRendered();

		} else if (!this.get('enableLazyRendering')) {

			return returnTrueAndEnsureAlwaysRendered();

		} else if (this.get('_hasUserInteracted')) {

			return returnTrueAndEnsureAlwaysRendered();

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
					Ember.run.next(() => {
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
