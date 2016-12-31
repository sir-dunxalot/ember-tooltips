import Ember from 'ember';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tether-tooltip-and-popover';
import layout from 'ember-tooltips/templates/components/tether-popover';

const { $, run } = Ember;

// These isElement________ functions are used to determine where an element
// is in relation to the $popover and the $target elements. This is needed to
// handle the visible state when a user interacts with any of these elements.

export const isElementInPopover = function(element, $popover) {
  // determines if element is $popover or contained within $popover
  if (!$popover) {
    return false;
  }
  return $popover.is(element) || !!$popover.find(element).length;
};

export const isElementInTargetAndNotInPopover = function(element, $target, $popover) {
  // determines if the element is $target or (in $target and not contained within $popover)
  if (!$target || !$popover) {
    return false;
  }
  if ($target.is(element)) {
    return true;
  }
  return !!$target.find(element).length && !isElementInPopover(element, $popover);
};

export const isElementElsewhere = function(element, $target, $popover) {
  // determines if element is not $popover, not $target, and not contained within either
  const isElementOutsidePopover = !isElementInPopover(element, $popover);
  const isElementOutsideTarget = !isElementInTargetAndNotInPopover(element, $target, $popover);
  return isElementOutsideTarget && isElementOutsidePopover;
};

export default TooltipAndPopoverComponent.extend({

  /* Options */
  hideDelay: 250,

  /* Properties */
  classNames: ['ember-popover'],
  _isMouseInside: false,
  layout,

  didRender() {
    // the lazy-render popover component instance needs access to the childView
    // so that it can call the childView's hide action
    this._super(...arguments);


    const parentView = this.get('parentView');
    if (parentView) {
      parentView.set('childView', this);
    }
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

      $target.on(_showOn, () => this.show());

      $target.add($popover).on(_hideOn, () => {
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
      });

      // we must use mouseover because it correctly
      // registers hover interactivity when spacing='0'
      $target.add($popover).on('mouseover', () => this.set('_isMouseInside', true));

    } else if (event === 'click') {

      $(document).on(`click.${target}`, (event) => {
        // this lightweight, name-spaced click handler is necessary to determine
        // where a click occurs -> https://css-tricks.com/dangers-stopping-event-propagation/
        const isClickedElementElsewhere = isElementElsewhere(event.target, $target, $popover);
        const isClickedElementInTarget = isElementInTargetAndNotInPopover(event.target, $target, $popover);
        const isClickedElementInPopover = isElementInPopover(event.target, $popover);
        const isPopoverShown = this.get('isShown');

        if (isClickedElementElsewhere && isPopoverShown) {
          // clickElement is elsewhere and the popover should hide()
          this.hide();
        } else if (!isClickedElementInPopover && isClickedElementInTarget) {
          // see notes in the .on('focus')
          if (this.get('_isInProcessOfShowing')) {
            this.set('_isInProcessOfShowing', false);
          } else {
            this.toggle();
          }
        }
      });
    }

    $target.on('focus', () => {
      // The focus event occurs before the click event.
      // when this happens we don't want to call focus then click.
      // _isInProcessOfShowing prevents that from happening.
      this.set('_isInProcessOfShowing', true);
      this.show();
    });

    $target.add($popover).on('focusout', () => {
      // use a run.later() to give the 'focusout' event enough time to finish handling
      run.later(() => {
        const isFocusedElementElsewhere = isElementElsewhere(document.activeElement, $target, $popover);
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

    $target.add($popover).off(`${_showOn} mouseover ${_hideOn} focus focusout`);

    $(document).off(`click.${target}`);
  },
  actions: {
    hide() {
      this.hide();
    }
  },
});
