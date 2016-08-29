import Ember from 'ember';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tooltip-and-popover';
import layout from 'ember-tooltips/templates/components/popover-on-element';

const { $, run } = Ember;

export default TooltipAndPopoverComponent.extend({

  hideDelay: '250',

  layout,
  classNames: ['ember-popover'],
  _isMouseInside: false,
  _isMouseOutside: Ember.computed.not('_isMouseInside'),
  _isMouseInsidePopover: false, /* see note below why this is necessary */
  didInsertElement() {
    this._super(...arguments);

    const event = this.get('event');
    const $target = $(this.get('target'));
    const $popover = this.$();

    if (event === 'none') {
      return;
    }

    const hideAfterDelayIfIsMouseOutside = () => {
      run.later(() => {
        if (this.get('_isMouseOutside')) {
          this.hide();
        }
      }, +this.get('hideDelay'));
    };

    /* record _isMouseInside events */
    $target.on('mouseenter', () => {
      this.set('_isMouseInside', true);
    });
    $popover.on('mouseenter', () => {
      this.set('_isMouseInsidePopover', true);
      this.set('_isMouseInside', true);
    });

    /* record !_isMouseInside events */
    $target.on('mouseleave', () => {
      this.set('_isMouseInside', false);
    });
    $popover.on('mouseleave', () => {
      this.set('_isMouseInsidePopover', false);
      this.set('_isMouseInside', false);
    });

    const _showOn = this.get('_showOn');
    const _hideOn = this.get('_hideOn');

    if (_showOn === 'mouseenter') {
      /* handle the popover hover */

      $target.on(_showOn, () => this.show());

      $target.on(_hideOn, () => hideAfterDelayIfIsMouseOutside());

      $popover.on(_hideOn, () => hideAfterDelayIfIsMouseOutside());

    } else if (_showOn === 'click') {
      /* handle the popover click */

      $target.on(_showOn, () => {
        /* $target.on('click'... ) gets called when the $popover is clicked
        we need _isMouseInsidePopover to reject this event */
        if (this.get('_isMouseInsidePopover')) {
          return;
        }

        if (this.get('tooltipIsVisible')) {
          this.hide();
        } else {
          this.show();
        }
      });

      $target.on('focusout', () => {
        if (this.get('_isMouseOutside')) {
          this.hide();
        }
      });

    }
  },
  actions: {
    hide() {
      this.hide();
    }
  }

});
