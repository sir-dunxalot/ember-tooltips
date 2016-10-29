import Ember from 'ember';

export const INTERACTION_EVENT_TYPES = ['mouseenter', 'click', 'focusin'];
export const PASSABLE_PROPERTY_NAMES = [
	// 'class', //TODO add tests for class
	// 'classNames', //TODO add tests for classNames
	// TODO add tests for classNameBindings
	'delay',
	'delayOnChange',
	'duration',
	// 'effect', //TODO add tests for this
	'event',
	'hideOn',
	'keepInWindow',
	'side',
	'showOn',
	'spacing',
	'isShown',
	'tooltipIsVisible',
	// 'hideDelay', //TODO add tests for this

	'onDestroy',
	'onHide',
	'onRender',
	'onShow',

	// deprecated lifecycle actions
	'onTooltipDestroy',
	'onTooltipHide',
	'onTooltipRender',
	'onTooltipShow',

	// TODO add targetAttachment and attachment
];

export default Ember.Component.extend({

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
	shouldRender: Ember.computed('enableLazyRendering', 'hasUserInteracted', function() {
		if (!this.get('enableLazyRendering')) {
			// users must opt-in to enableLazyRendering
			return true;
		} else {
			return this.get('hasUserInteracted');
		}
	}),

	didInsertElement() {
		this._super(...arguments);

		if (this.get('hasUserInteracted')) {
			return;
		}

		const $element = this.$();
		const $parent = $element.parent();

		INTERACTION_EVENT_TYPES.forEach((eventType) => {
			$parent.on(`${eventType}.lazy-ember-popover`, () => {
				if (!this.get('hasUserInteracted')) {
					this.set('hasUserInteracted', true);
					Ember.run.next(() => {
						$element.trigger(eventType);
					});
				} else {
					$parent.off(`${eventType}.lazy-ember-popover`);
				}
			});
		});

		// todo make this a utility called deletePassThroughClassNames()
		var classNamesToDeleteString = this.get('class') || '';
		classNamesToDeleteString = classNamesToDeleteString.concat(' ', (this.get('classNames') || []).join(' '));

		$element.removeClass(classNamesToDeleteString); // TODO explain this hack and add tests
	},

	willDestroyElement() {
		this._super(...arguments);

		const $parent = this.$().parent();
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
