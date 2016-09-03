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
    const target = this.get('target');
    const $target = $(target);
    const $popover = this.$();

    if (event === 'none') {

      return;

    } else if (event === 'hover') {

      const _showOn = this.get('_showOn');
      const _hideOn = this.get('_hideOn');

      // _showOn == 'mouseenter'
      $target.on(_showOn, () => this.show());

      // _hideOn == 'mouseleave'
      $target.add($popover).on(_hideOn, () => {
        run.later(() => {
          if (!this.get('_isMouseInside')) {
            this.hide();
          }
        }, +this.get('hideDelay'));
      });

      // we must use mouseover/mouseout because they correctly
      // register hover interactivity when spacing='0'
      $target.add($popover).on('mouseover', () => this.set('_isMouseInside', true));
      $target.add($popover).on('mouseout', () => this.set('_isMouseInside', false));

    } else if (event === 'click') {

      $(document).on(`click.${target}`, (event) => {
        // this lightweight, name-spaced click handler is necessary to determine
        // if a click is NOT on $target and NOT an ancestor of $target.
        // If so then it must be a click elsewhere and should close the popover
        // see... https://css-tricks.com/dangers-stopping-event-propagation/
        const clickedElement = event.target;
        const isClickOutsideTarget = $target[0] !== clickedElement;
        const isClickOutsidePopover = !$target.find(clickedElement).length;
        const isShown = this.get('isShown');

        if (isClickOutsideTarget && isClickOutsidePopover && isShown) {
          this.hide();
        }
      });

      // we use mousedown because it occurs before the focus event
      $target.on('mousedown', (event) => {
        // $target.on('mousedown') is called when the $popover is
        // clicked because the $popover is contained within the $target.
        // This will ignores those types of clicks.
        if ($popover[0] === event.target || $popover.find(event.target).length) {
          return;
        }
        this.toggle();
      });
    }

    $target.on('focus', () => this.show());

    $popover.on('focusout', () => {
      // use a run.later() to allow the 'focusout' event to finish handling
      run.later(() => {
        const focusedElement = document.activeElement;
        const isFocusedElementTarget = focusedElement === $target[0];
        const isFocusedElementPopover = focusedElement === $popover[0];
        const isFocusedElementInPopover = !!$popover.find(focusedElement).length;
        if (isFocusedElementTarget || isFocusedElementPopover || isFocusedElementInPopover) {
          return;
        }
        this.hide();
      });
    });
  },
  willDestroyElement() {
    this._super(...arguments);

    const target = this.get('target');
    const $target = $(target);
    const $popover = this.$();
    const _showOn = this.get('_showOn');
    const _hideOn = this.get('_hideOn');

    $target.add($popover).off(`${_showOn} mouseover ${_hideOn} mouseout mousedown focus focusout`);

    $(document).off(`click.${target}`);

  },
  actions: {
    hide() {
      this.hide();
    }
  },

});
