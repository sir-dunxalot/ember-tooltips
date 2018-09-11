import $ from 'jquery';
import { bind, run } from '@ember/runloop';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tether-tooltip-and-popover';
import layout from 'ember-tooltips/templates/components/tether-popover';

/* These isElement________ functions are used to determine where an element
is in relation to the $popover and the $target elements. This is needed to
handle the visible state when a user interacts with any of these elements.
*/

/**
 * Determines if element is $popover or contained within $popover
 *
 * @method isElementInPopover
 * @param {DOM element} element
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementInPopover(element, $popover) {
  if (!$popover) {
    return false;
  }

  return $popover.is(element) || !!$popover.find(element).length;
}

/**
 * Determines if the element is $target or (in $target and not
 * contained within $popover)
 *
 * @method isElementInTargetAndNotInPopover
 * @param {DOM element} element
 * @param {jQuery element} $target
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementInTargetAndNotInPopover(element, $target, $popover) {
  if (!$target || !$popover) {
    return false;
  }

  if ($target.is(element)) {
    return true;
  }

  return !!$target.find(element).length && !isElementInPopover(element, $popover);
}

/**
 * Determines if element is not $popover, not $target, and
 * not contained within either.
 *
 * @method isElementElsewhere
 * @param {DOM element} element
 * @param {jQuery element} $target
 * @param {jQuery element} $popover
 * @return {boolean}
 * @public
 */

export function isElementElsewhere(element, $target, $popover) {
  const isElementOutsidePopover = !isElementInPopover(element, $popover);
  const isElementOutsideTarget = !isElementInTargetAndNotInPopover(element, $target, $popover);

  return isElementOutsideTarget && isElementOutsidePopover;
}

export default TooltipAndPopoverComponent.extend({

  /* Options */

  hideDelay: 250,

  /* Properties */

  classNames: ['ember-popover'],
  layout,

  _isMouseInside: false,

  didRender() {

    /* The lazy-render popover component instance needs
    access to the childView so that it can call the
    childView's hide action.
    */

    this._super(...arguments);

    const parentView = this.get('parentView');

    if (parentView) {
      parentView.set('_childView', this);
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

      $target.on(_showOn, bind(this, this.show));

      $target.add($popover).on(_hideOn, bind(this, () => {
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
      }));

      /* We must use mouseover because it correctly
      registers hover interactivity when spacing='0'
      */

      $target.add($popover).on('mouseover', bind(this, () => this.set('_isMouseInside', true)));

    } else if (event === 'click') {

      $(document).on(`click.${target}`, bind(this, (event) => {

        /* This lightweight, name-spaced click handler is
        necessary to determine where a click occurs

        https://css-tricks.com/dangers-stopping-event-propagation/
        */

        const isClickedElementElsewhere = isElementElsewhere(event.target, $target, $popover);
        const isClickedElementInTarget = isElementInTargetAndNotInPopover(event.target, $target, $popover);
        const isClickedElementInPopover = isElementInPopover(event.target, $popover);
        const isPopoverShown = this.get('isShown');

        if (isClickedElementElsewhere && isPopoverShown) {

          /* The clickedElement is elsewhere and the popover
          should hide() */

          this.hide();
        } else if (!isClickedElementInPopover && isClickedElementInTarget) {

          /* See notes in the .on('focus') */

          if (this.get('_isInProcessOfShowing')) {
            this.set('_isInProcessOfShowing', false);
          } else {
            this.toggle();
          }
        }
      }));
    }

    $target.on('focus', bind(this, () => {

      /* The focus event occurs before the click event.
      when this happens we don't want to call focus then click.
      _isInProcessOfShowing prevents that from happening.
      */

      this.set('_isInProcessOfShowing', true);
      this.show();
    }));

    $target.add($popover).on('focusout', bind(this, () => {

      /* Use a run.later() to allow the 'focusout' event
      to finish handling.
      */

      run.later(() => {
        const isFocusedElementElsewhere = isElementElsewhere(document.activeElement, $target, $popover);

        if (isFocusedElementElsewhere) {
          this.hide();
        }
      });
    }));
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
    },
  },
});
