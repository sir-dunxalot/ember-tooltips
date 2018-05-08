import config from '../config/environment';
import TooltipOnElement from 'ember-tooltips/components/tooltip-on-element';

let isTestingMode = (config.environment === 'test') || (Ember.testing === true);

let _didUpdateTimeoutLength = isTestingMode ? 0 : 1000;

export default TooltipOnElement.extend({ _didUpdateTimeoutLength });
