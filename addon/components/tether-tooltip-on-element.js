import $ from 'jquery';
import TooltipAndPopoverComponent from 'ember-tooltips/components/tether-tooltip-and-popover';

export default TooltipAndPopoverComponent.extend({

  classNames: ['ember-tooltip'],
  didInsertElement() {
    this._super(...arguments);

    /* Setup event handling to hide and show the tooltip */

    const $target = $(this.get('target'));
    const event = this.get('event');

    /* Setup event handling to hide and show the tooltip */

    if (event !== 'none') {
      const _hideOn = this.get('_hideOn');
      const _showOn = this.get('_showOn');

      /* If show and hide are the same (e.g. click), toggle
      the visibility */

      if (_showOn === _hideOn) {
        $target.on(_showOn, () => {

          /* When using enableLazyRendering the focus event occurs before the click event.
          When this happens we don't want to call focus then click.
          _isInProcessOfShowing prevents that from happening. */

          if (this.get('_isInProcessOfShowing')) {
            this.set('_isInProcessOfShowing', false);
          } else {
            this.toggle();
          }
        });
      } else {

        /* Else, add the show and hide events individually */

        if (_showOn !== 'none') {
          $target.on(_showOn, () => {
            this.show();
          });
        }

        if (_hideOn !== 'none') {
          $target.on(_hideOn, () => {
            this.hide();
          });
        }
      }

      /* Hide and show the tooltip on focus and escape
      for accessibility */

      if (event !== 'focus') {

        /* If the event is click, we don't want the
        click to also trigger focusin */

        if (event !== 'click') {
          $target.focusin(() => {
            this.show();
          });
        }

        $target.focusout(() => {
          this.hide();
        });
      }

      $target.keydown((keyEvent) => {
        if (keyEvent.which === 27) {
          this.hide();
          keyEvent.preventDefault();

          return false;
        }
      });
    }
  },
});
