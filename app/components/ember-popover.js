import config from '../config/environment';
import EmberPopover from 'ember-tooltips/components/ember-popover';

let _didUpdateTimeoutLength = config.environment === 'test' ? 0 : 1000;

export default EmberPopover.extend({ _didUpdateTimeoutLength });
