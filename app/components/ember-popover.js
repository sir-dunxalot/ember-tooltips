import config from '../config/environment';
import EmberPopover from 'ember-tooltips/components/ember-popover';

let _animationDuration = config.environment === 'test' ? 0 : 200;

export default EmberPopover.extend({ _animationDuration });
