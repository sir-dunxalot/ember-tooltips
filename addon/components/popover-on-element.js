import Ember from 'ember';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tooltip-and-popover';
import layout from 'ember-tooltips/templates/components/popover-on-element';

const { $, run } = Ember;

export default TooltipAndPopoverComponent.extend({

  hideDelay: '250',

  layout,
  classNames: ['ember-popover'],
  _isMouseInside: false,
  didInsertElement() {
    this._super(...arguments);

    const event = this.get('event');
    const $target = $(this.get('target'));
    const $popover = this.$();

    if (event === 'none') {
      return;
    }

    const _showOn = this.get('_showOn');
    const _hideOn = this.get('_hideOn');

    if (_showOn === 'mouseenter') {

      // we must use mouseover, which correctly
      // registers hover interactivity when spacing=0
      $target.add($popover).on('mouseover click', () => this.set('_isMouseInside', true));
      $target.add($popover).on('mouseout', () => this.set('_isMouseInside', false));

      $target.on(_showOn, () => this.show());

      $target.on(_hideOn, () => this.hideAfterDelayIfIsMouseOutside());

      $popover.on(_hideOn, () => this.hideAfterDelayIfIsMouseOutside());

    } else if (_showOn === 'click') {

      $(document).on('click', (event) => {
        // this lightweight document.click handler is necessary to determine
        // if a click is NOT on $target and NOT an ancestor of $target.
        // If so then it must be a click elsewhere and should close the popover
        // see... https://css-tricks.com/dangers-stopping-event-propagation/
        let $clickedElement = event.target;
        if (this.get('tooltipIsVisible') &&
            $target[0] !== $clickedElement &&
            !$target.find($clickedElement).length) {
          this.hide();
        }
      });

      $target.on('click', (event) => {
        /* $target.on('click') is called when the $popover is clicked because the $popover
        is contained within the $target. This will ignores those types of clicks. */
        if ($target[0] !== event.target) {
          return;
        }
        this.toggle();
      });

    }
  },
  hideIfIsMouseOutside() {
    if (!this.get('_isMouseInside')) {
      this.hide();
    }
  },
  hideAfterDelayIfIsMouseOutside() {
    run.later(() => {
      this.hideIfIsMouseOutside();
    }, +this.get('hideDelay'));
  },
  actions: {
    hide() {
      this.hide();
      this.set('_isMouseInside', false);
    }
  },

});
