import config from '../config/environment';
import EmberTooltip from 'ember-tooltips/components/ember-tooltip';

let _animationDuration = config.environment === 'test' ? 0 : 200;

export default EmberTooltip.extend({ _animationDuration });
