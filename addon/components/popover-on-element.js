import LazyRenderWrapperComponent from 'ember-tooltips/components/lazy-render-wrapper';
import layout from 'ember-tooltips/templates/components/popover-on-element';

export default LazyRenderWrapperComponent.extend({
	layout,

	childView: null, // this is set during the childView's didRender and is needed for the hide action
	actions: {
		hide() {
			const childView = this.get('childView');
			childView.send('hide');
		},
	},
});
