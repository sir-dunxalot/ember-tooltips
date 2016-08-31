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
    const _showOn = this.get('_showOn');

    if (event === 'none') {
      return;
    }

    if (event === 'hover') {

      const _hideOn = this.get('_hideOn');

      // we must use mouseover/mouseout because they correctly
      // register hover interactivity when spacing='0'
      $target.add($popover).on('mouseover', () => this.set('_isMouseInside', true));
      $target.add($popover).on('mouseout', () => this.set('_isMouseInside', false));

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

    } else if (event === 'click') {

      $(document).on(`click.${target}`, (event) => {
        // this lightweight, namespaced click handler is necessary to determine
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
        // $target.on('click') is called when the $popover is clicked because the $popover
        // is contained within the $target. This will ignores those types of clicks.
        // It will also ignore if the lastEventType was focus.
        // This is necessary because focus occurs before click, thereby flickering the popover
        if ($target[0] !== event.target || lastEventType === 'focus') {
          lastEventType = event.type;
          return;
        }
        this.toggle();
      });

    }

    // always allow focus and blur to show/hide the popover
    // for accessibility and mobile interaction

    let lastEventType;

    $target.on('focus', (event) => {
      lastEventType = event.type;
      this.show();
    });

    // only hide() if the new focused element is outside of the popover
    // this adds a blur listener to each descendant within $target
    $target.on('blur', '*', () => {

      run.later(() => {
        const isFocusedElementElsewhere = !$popover.find(':focus').length;
        if (isFocusedElementElsewhere) {
          this.hide();
        }
      }, 1);

    });

  },
  willDestroyElement() {
    this._super(...arguments);

    const target = this.get('target');
    const $target = $(target);
    const $popover = this.$();
    const _showOn = this.get('_showOn');
    const _hideOn = this.get('_hideOn');

    $target.add($popover).off(`${_showOn} mouseover ${_hideOn} mouseout click`);

    $(document).off(`click.${target}`);

  },
  actions: {
    hide() {
      this.hide();
    }
  },

});
