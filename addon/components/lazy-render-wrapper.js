import Ember from 'ember';

const { get, $ } = Ember;

// https://github.com/emberjs/rfcs/issues/168
// TODO how will this work with "-on-component" instances?
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
export const PASSABLE_PROPERTY_NAMES = [
	// 'id',
	// 'class', //TODO add tests for class
	// 'classNames', //TODO add tests for classNames
	// TODO add tests for classNameBindings
	// TODO maybe alphabetize this or organize according to presentation in docs
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
	// 'role', // TODO add tests
	// 'tabindex', // TODO add tests
	// 'attribueBindings', // TODO add tests


	'onDestroy',
	'onHide',
	'onRender',
	'onShow',

	// deprecated lifecycle actions
	'onTooltipDestroy',
	'onTooltipHide',
	'onTooltipRender',
	'onTooltipShow',

	// non-publicized attributes
	'targetAttachment',
	'attachment',
	// 'updateFor', // TODO add tests

	// TODO fix deprecation. didInitAttrs called in .... emberjs.com/deprecations/v2.x#toc_ember-component-didinitattrs
	// TODO see if I can fix ember-beta and ember-canary test failures...
		// https://travis-ci.org/sir-dunxalot/ember-tooltips/jobs/172101919
		// https://travis-ci.org/sir-dunxalot/ember-tooltips/jobs/172101920

	// TODO make PASSABLE_PROPERTY_NAMES editable

	// TODO make sure that each test has `assert.expect` at the beginning
];

export default Ember.Component.extend({
	tagName: '',

	// data down
	passedProperties: Ember.computed(...PASSABLE_PROPERTY_NAMES, function() {
		// this will return an object of approved options attributes
		// which may be passed to this object

		// TODO write unit tests for passedProperties
		// TODO make PASSABLE_PROPERTY_NAMES an attribute on tooltip-on-element so people can pass thru whatever
		// TODO rename all of these things

		return PASSABLE_PROPERTY_NAMES.reduce((passablePropertiesObject, propName) => {
			let passedProperty = this.get(propName);

			if (!Ember.isNone(passedProperty)) {
				passablePropertiesObject[propName] = passedProperty;
			}

			return passablePropertiesObject;
		}, {});
	}),

	enableLazyRendering: false,
	hasUserInteracted: false,
	shouldRender: Ember.computed('isShown', 'enableLazyRendering', 'hasUserInteracted', function() {
		if (this.get('isShown')) {
			this.set('hasUserInteracted', true); // when isShown is true we don't depend on hasUserInteracted events
			return true;
		}
		if (!this.get('enableLazyRendering')) {
			// users must opt-in to enableLazyRendering
			return true;
		} else {
			return this.get('hasUserInteracted');
		}
	}),



	didInsertElement() {
		this._super(...arguments);

		if (this.get('shouldRender')) {
			// if the tooltip is rendered we don't need
			// any special $parent event handling
			return;
		}

		const $parent = getParent(this);

		INTERACTION_EVENT_TYPES.forEach((eventType) => {
			$parent.on(`${eventType}.lazy-ember-popover`, () => {
				if (!this.get('hasUserInteracted')) {
					this.set('hasUserInteracted', true);
					Ember.run.next(() => {
						$parent.trigger(eventType);
					});
				} else {
					$parent.off(`${eventType}.lazy-ember-popover`);
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

	// actions up
	actions: {
		onRender() {
			this.sendAction('onRender', ...arguments);
		},
		onShow() {
			this.sendAction('onShow', ...arguments);
		},
		onHide() {
			this.sendAction('onHide', ...arguments);
		},
		onDestroy() {
			this.sendAction('onDestroy', ...arguments);
		},

		// deprecated lifecycle actions
		onTooltipRender() {
			this.sendAction('onTooltipRender', ...arguments);
		},
		onTooltipShow() {
			this.sendAction('onTooltipShow', ...arguments);
		},
		onTooltipHide() {
			this.sendAction('onTooltipHide', ...arguments);
		},
		onTooltipDestroy() {
			this.sendAction('onTooltipDestroy', ...arguments);
		},
	}
});
