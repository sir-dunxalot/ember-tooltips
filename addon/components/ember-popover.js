import Ember from 'ember';
import EmberTooltipBase from 'ember-tooltips/components/ember-tooltip-base';
import {
  isElementInPopover,
  isElementInTargetAndNotInPopover,
  isElementElsewhere,
} from 'ember-tooltips/utils/ember-popover';

const { run } = Ember;

export default EmberTooltipBase.extend({
  popoverHideDelay: 250,
  tooltipClassName: 'ember-popover',

  _isMouseInside: false,

  actions: {
    hide() {
      this.hide();
    },
  },

  didInsertElement() {
    this._super(...arguments);

    const event = this.get('event');
    const target = this.get('target');
    const popover = target.popper; /* TODO - get popover element */

    if (event === 'none') {
      return;
    } else if (event === 'hover') {
      const hideOn = this.get('hideOn');
      const showOn = this.get('showOn');

      this._addEventListener(showOn, () => {
        this.show();
      });

      const hideOnCallback = () => {
        this.set('_isMouseInside', false);

        const hideDelay = +this.get('hideDelay');
        const hideIfOutside = () => {
          if (!this.get('_isMouseInside')) {
            this.hide();
          }
        };

        if (hideDelay) {
          run.later(() => {
            hideIfOutside();
          }, hideDelay);
        } else {
          hideIfOutside();
        }
      };

      this._addEventListener(hideOn, hideOnCallback);
      this._addEventListener(hideOn, hideOnCallback, popover);

      /* We must use mouseover because it correctly
      registers hover interactivity when spacing='0'
      */

      const mouseoverCallback = () => {
        this.set('_isMouseInside', true);
      };

      this._addEventListener('mouseover', mouseoverCallback);
      this._addEventListener('mouseover', mouseoverCallback, popover);

    } else if (event === 'click') {

      this._addEventListener('click', (event) => {

        /* This lightweight, name-spaced click handler is
        necessary to determine where a click occurs

        https://css-tricks.com/dangers-stopping-event-propagation/

        TODO - revisit the need for weird event handler name
        */

        const eventTarget = event.target;
        const isClickedElementElsewhere = isElementElsewhere(eventTarget, target, popover);
        const isClickedElementInTarget = isElementInTargetAndNotInPopover(eventTarget, target, popover);
        const isClickedElementInPopover = isElementInPopover(eventTarget, popover);
        const isPopoverShown = this.get('isShown');

        if (isClickedElementElsewhere && isPopoverShown) {

          /* The clickedElement is elsewhere and the popover
          should hide() */

          this.hide();
        } else if (!isClickedElementInPopover && isClickedElementInTarget) {
          this.toggle();
        }

      }, document);

      if (event !== 'click') {
        this._addEventListener('focus', (event) => {
          this.show();
        });
      }

      this._addEventListener('focusout', (event) => {

        /* Use a run.later() to allow the 'focusout' event
        to finish handling.
        */

        run.later(() => {
          const isFocusedElementElsewhere = isElementElsewhere(document.activeElement, target, popover);

          if (isFocusedElementElsewhere) {
            this.hide();
          }
        });

      });
    }
  },

});
