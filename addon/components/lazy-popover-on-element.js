import Ember from 'ember';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tooltip-and-popover';

const { $, run } = Ember;

export default TooltipAndPopoverComponent.extend({

  /* Options */
  hideDelay: 250,

  /* Properties */
  classNames: ['ember-popover'],
  _isMouseInside: false,

  didRender() {
    // the lazy-render popover component instance needs access to the childView
    // so that it can call the childView's hide action
    this._super(...arguments);

    const parentView = this.get('parentView');
    parentView.set('childView', this);
  },
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
        const isClickedElementElsewhere = this._isElementElsewhere(event.target);
        const isPopoverShown = this.get('isShown');

        if (isClickedElementElsewhere && isPopoverShown) {
          this.hide();
        }
      });

      // we use mousedown because it occurs before the focus event
      $target.on('mousedown', (event) => {
        // $target.on('mousedown') is called when the $popover is
        // clicked because the $popover is contained within the $target.
        // This will ignores those types of clicks.
        const isMouseDownElementInPopover = this._isElementInPopover(event.target);
        if (isMouseDownElementInPopover) {
          return;
        }
        this.toggle();
      });
    }

    $target.on('focus', () => this.show());

    $popover.on('focusout', () => {
      // use a run.later() to allow the 'focusout' event to finish handling
      run.later(() => {
        const isFocusedElementElsewhere = this._isElementElsewhere(document.activeElement);
        if (isFocusedElementElsewhere) {
          this.hide();
        }
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
  _isElementInPopover(newElement) {
    // determines if newElement is $popover or contained within $popover
    const $popover = this.$();
    return $popover.is(newElement) || $popover.find(newElement).length;
  },
  _isElementElsewhere(newElement) {
    // determines if newElement is not $target, not $popover, and not contained within either
    const $target = $(this.get('target'));

    const isNewElementOutsideTarget = !$target.is(newElement) && !$target.find(newElement).length;
    const isNewElementOutsidePopover = !this._isElementInPopover(newElement);

    return isNewElementOutsideTarget && isNewElementOutsidePopover;
  },
  actions: {
    hide() {
      this.hide();
    }
  },
});
