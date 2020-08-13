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
    const { target, _tooltip } = this;

    this.addPopoverEventListeners();

    /* If the user clicks outside the popover, hide the popover. */

    this._addEventListener('click', (event) => {
      const { target: eventTarget } = event;
      const clickIsOnPopover = eventTarget == _tooltip.popperInstance.popper;
      const clickIsOnTarget = eventTarget == target;
      const hasHideOnEvent = this.hideOn && this.hideOn !== 'none';
      const hideOnOutsideClick = hasHideOnEvent &&
        !this._isMouseInside &&
        !clickIsOnPopover &&
        !clickIsOnTarget &&
        this.isShown;

      if (hideOnOutsideClick) {
        this.hide();
      }
    }, document);
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
      if (!this._isMouseInside && this.hideOn !== 'none') {
        this.hide();
      }
    });
  },

  addPopoverEventListeners() {
    const _tooltip = this._tooltip;
    const popover = _tooltip.popperInstance.popper;

    /* We must use mouseover because it correctly
    registers hover interactivity when spacing='0'
    */

    this._addEventListener('mouseenter', () => {
      this.set('_isMouseInside', true);

      if (this.showOn === 'mouseenter' && !this.isShown) {
        this.show();
      }
    }, popover);

    this._addEventListener('mouseleave', () => {
      this.set('_isMouseInside', false);

      if (this.hideOn === 'mouseleave' && this.isShown) {
        this.hide();
      }
    }, popover);

    this._addEventListener('focusout', () => {
      if (!this._isMouseInside && this.isShown && this.hideOn !== 'none') {
        this.hide();
      }
    }, popover);
  },

  hide() {
    if (this.isDestroying) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    cancel(this._showTimer);

    later(() => {
      if (!this._isMouseInside || !this.isShown) {
        this._hideTooltip();
      }
    }, +this.popoverHideDelay);
  },

});
