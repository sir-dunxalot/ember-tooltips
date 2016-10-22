import Ember from 'ember';
import layout from 'ember-tooltips/templates/components/tooltip-on-element';

const EVENT_TYPES = ['mouseenter', 'click', 'focusin']; //TODO rename

export default Ember.Component.extend({
	layout,


	shouldRender: false, //TODO(Andrew) make this true before merging so people can opt-in to behavior
	didInsertElement() {
		this._super(...arguments);

		if (this.get('shouldRender')) {
			return;
		}

		const $element = this.$();
		const $parent = $element.parent();

		EVENT_TYPES.forEach((eventType) => {
			$parent.on(`${eventType}.lazy-ember-tooltip`, () => {
				if (!this.get('shouldRender')) {
					this.set('shouldRender', true);
					Ember.run.next(() => {
						$element.trigger(eventType);
					});
				} else {
					$parent.off(`${eventType}.lazy-ember-tooltip`);
				}
			});
		});
	},

	willDestroyElement() {
		this._super(...arguments);

		const $parent = this.$().parent();
		EVENT_TYPES.forEach((eventType) => {
			$parent.off(`${eventType}.lazy-ember-tooltip`);
		});

	},
});
