import LazyRenderWrapperComponent from 'ember-tooltips/components/lazy-render-wrapper';
import layout from 'ember-tooltips/templates/components/tooltip-on-element';

export default LazyRenderWrapperComponent.extend({
	layout,
});

// TODO add tests for target="#some-string"
// TODO add test for updateFor and onTooltipShow
