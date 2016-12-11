import Ember from 'ember';
import layout from 'ember-tooltips/templates/components/lazy-render-wrapper';

const { computed, get, $ } = Ember;

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
	_shouldRender: computed('isShown', 'enableLazyRendering', '_hasUserInteracted', function() {
		// if isShown, !enableLazyRendering, or _hasUserInteracted then
		// we return true and set _hasRendered to true because
		// there is never a scenario where this wrapper should destroy the tooltip

		if (this.get('_hasRendered')) {

			return true;

		} else if (this.get('isShown')) {

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
	_shouldShowOnRender: false,

	event: 'hover', // hover, click, focus, none
	entryInteractionEvents: computed('event', function() {
		let entryInteractionEvents = ['focusin'];
		let event = this.get('event');
		if (event === 'hover') {
			entryInteractionEvents.push('mouseenter');
		} else if (event === 'click') {
			entryInteractionEvents.push('click');
		}

		return entryInteractionEvents;
	}),

	didInsertElement() {
		this._super(...arguments);

		if (this.get('_shouldRender')) {
			// if the tooltip _shouldRender then we don't need
			// any special $parent event handling
			return;
		}

		const $parent = getParent(this);

		if (this.get('event') === 'hover') {
			$parent.on('mouseleave.target-lazy-render-wrapper', () => {
				this.set('_shouldShowOnRender', false);
			});
		}

		this.get('entryInteractionEvents').forEach((entryInteractionEvent) => {
			$parent.on(`${entryInteractionEvent}.target-lazy-render-wrapper`, () => {
				if (this.get('_hasUserInteracted')) {
					$parent.off(`${entryInteractionEvent}.target-lazy-render-wrapper`);
				} else {
					this.set('_hasUserInteracted', true);
					this.set('_shouldShowOnRender', true);
				}
			});
		});
	},

	childView: null, // this is set during the childView's didRender and is needed for the hide action
	actions: {
		hide() {
			const childView = this.get('childView');
			childView.send('hide');
		},
	},

	willDestroyElement() {
		this._super(...arguments);

		const $parent = getParent(this);
		this.get('entryInteractionEvents').forEach((entryInteractionEvent) => {
			$parent.off(`${entryInteractionEvent}.target-lazy-render-wrapper`);
		});

		$parent.off('mouseleave.target-lazy-render-wrapper');
	},
});
