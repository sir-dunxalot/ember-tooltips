import config from '../config/environment';
import TooltipOnElement from 'ember-tooltips/components/tooltip-on-element';

let _didUpdateTimeoutLength = config.environment === 'test' ? 0 : 1000;

export default TooltipOnElement.extend({ _didUpdateTimeoutLength });
