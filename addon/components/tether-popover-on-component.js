import TetherPopoverOnElement from 'ember-tooltips/components/tether-popover-on-element';
import { onComponentTarget } from 'ember-tooltips/utils';

export default TetherPopoverOnElement.extend({
  target: onComponentTarget,
});
