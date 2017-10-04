import config from '../config/environment';
import EmberTooltip from 'ember-tooltips/components/ember-tooltip-simple';

let _didUpdateTimeoutLength = config.environment === 'test' ? 0 : 1000;

export default EmberTooltip.extend({ _didUpdateTimeoutLength });
