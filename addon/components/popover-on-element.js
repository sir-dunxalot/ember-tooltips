import LazyRenderWrapperComponent from 'ember-tooltips/components/lazy-render-wrapper';

export default LazyRenderWrapperComponent.extend({

	tetherComponentName: 'tether-popover-on-element',

	childView: null, // this is set during the childView's didRender and is needed for the hide action
	actions: {
		hide() {
			const childView = this.get('childView');
			childView.send('hide');
		},
	},
});
