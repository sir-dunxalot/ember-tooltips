import { cancel, later } from '@ember/runloop';
import EmberTooltipBase from 'ember-tooltips/components/ember-tooltip-base';

export default EmberTooltipBase.extend({
  popoverHideDelay: 250,
  _tooltipVariantClass: 'ember-popover',

  _isMouseInside: false,

  actions: {
    hide() {
      this.set('_isMouseInside', false);
      this.hide();
    },
  },

  addTargetEventListeners() {
    this.addTooltipTargetEventListeners();
    this.addPopoverTargetEventListeners();
  },

  addTooltipBaseEventListeners() {
    const { target, _tooltip } = this.getProperties('target', '_tooltip');

    this.addPopoverEventListeners();

    /* If the user clicks outside the popover, hide the popover. */

    this._addEventListener(
      'click',
      (event) => {
        const { target: eventTarget } = event;
        const clickIsOnPopover = eventTarget == _tooltip.popperInstance.popper;
        const clickIsOnTarget = eventTarget == target;
        const hasHideOnEvent =
          this.get('hideOn') && this.get('hideOn') !== 'none';
        const hideOnOutsideClick =
          hasHideOnEvent &&
          !this.get('_isMouseInside') &&
          !clickIsOnPopover &&
          !clickIsOnTarget &&
          this.get('isShown');

        if (hideOnOutsideClick) {
          this.hide();
        }
      },
      document
    );
  },

  addPopoverTargetEventListeners() {
    /* We must use mouseover because it correctly
    registers hover interactivity when spacing='0'
    */

    this._addEventListener('mouseenter', () => {
      this.set('_isMouseInside', true);
    });

    this._addEventListener('mouseleave', () => {
      this.set('_isMouseInside', false);
    });

    this._addEventListener('focusout', () => {
      if (!this.get('_isMouseInside') && this.get('hideOn') !== 'none') {
        this.hide();
      }
    });
  },

  addPopoverEventListeners() {
    const _tooltip = this.get('_tooltip');
    const popover = _tooltip.popperInstance.popper;

    /* We must use mouseover because it correctly
    registers hover interactivity when spacing='0'
    */

    this._addEventListener(
      'mouseenter',
      () => {
        this.set('_isMouseInside', true);

        if (this.get('showOn') === 'mouseenter' && !this.get('isShown')) {
          this.show();
        }
      },
      popover
    );

    this._addEventListener(
      'mouseleave',
      () => {
        this.set('_isMouseInside', false);

        if (this.get('hideOn') === 'mouseleave' && this.get('isShown')) {
          this.hide();
        }
      },
      popover
    );

    this._addEventListener(
      'focusout',
      () => {
        if (
          !this.get('_isMouseInside') &&
          this.get('isShown') &&
          this.get('hideOn') !== 'none'
        ) {
          this.hide();
        }
      },
      popover
    );
  },

  hide() {
    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    cancel(this.get('_showTimer'));

    later(() => {
      if (!this.get('_isMouseInside') || !this.get('isShown')) {
        this._hideTooltip();
      }
    }, +this.get('popoverHideDelay'));
  },
});
