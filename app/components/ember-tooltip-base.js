import config from '../config/environment';
import EmberTooltipBase from 'ember-tooltips/components/ember-tooltip-base';

let _didUpdateTimeoutLength = config.environment === 'test' ? 0 : 1000;

export default EmberTooltipBase.extend({ _didUpdateTimeoutLength });
