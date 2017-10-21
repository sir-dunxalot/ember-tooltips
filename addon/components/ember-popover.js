import Ember from 'ember';
import EmberTooltipBase from 'ember-tooltips/components/ember-tooltip-base';

const {
  computed,
  run,
} = Ember;

export default EmberTooltipBase.extend({
  popoverHideDelay: 250,
  tooltipClassName: 'ember-popover',

  hideDelay: computed.deprecatingAlias('popoverHideDelay', {
    id: 'EmberTooltipBase.popoverHideDelay',
    until: '3.2.0',
  }),

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
    this.addPopoverEventListeners();

    /* If the user clicks outside the popover, hide the popover. */

    this._addEventListener('click', () => {
      if (!this.get('_isMouseInside')) {
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
      if (!this.get('_isMouseInside')) {
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

    this._addEventListener('mouseenter', () => {
      this.set('_isMouseInside', true);

      if (this.get('showOn') === 'mouseenter' && !this.get('isShown')) {
        this.show();
      }
    }, popover);

    this._addEventListener('mouseleave', () => {
      this.set('_isMouseInside', false);

      if (this.get('hideOn') === 'mouseleave' && this.get('isShown')) {
        this.hide();
      }
    }, popover);

    this._addEventListener('focusout', () => {
      if (!this.get('_isMouseInside')) {
        this.hide();
      }
    }, popover);
  },

  hide() {
    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    run.later(() => {
      if (!this.get('_isMouseInside')) {
        this._hideTooltip();
      }
    }, +this.get('popoverHideDelay'));
  },

});
