import TooltipOnElementComponent from 'ember-tooltips/components/tooltip-on-element';
import { onComponentTarget } from 'ember-tooltips/utils';

export default TooltipOnElementComponent.extend({

	target: onComponentTarget,

});
