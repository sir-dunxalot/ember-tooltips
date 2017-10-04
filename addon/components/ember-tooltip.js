import Ember from 'ember';
import EmberTooltipBase from 'ember-tooltips/components/ember-tooltip-base';

const { $ } = Ember;

export default EmberTooltipBase.extend({

  didInsertElement() {
    this._super(...arguments);

    /* Setup event handling to hide and show the tooltip */

    const event = this.get('event');

    /* Setup event handling to hide and show the tooltip */

    if (event === 'none') {
      return;
    }

    const hideOn = this.get('hideOn');
    const showOn = this.get('showOn');
    const target = this.get('target');

    /* If show and hide are the same (e.g. click) toggle
    the visibility */

    if (showOn === hideOn) {
      this._addListenerToTarget(showOn, () => {
        this.toggle();
      });
    } else {

      /* Else, add the show and hide events individually */

      if (showOn !== 'none') {
        this._addListenerToTarget(showOn, () => {
          this.show();
        });
      }

      if (hideOn !== 'none') {
        this._addListenerToTarget(hideOn, () => {
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
        this._addListenerToTarget('focusin', () => {
          this.show();
        });
      }

      this._addListenerToTarget('focusout', () => {
        this.hide();
      });
    }

    this._addListenerToTarget('keydown', (keyEvent) => {
      if (keyEvent.which === 27) {
        this.hide();

        keyEvent.preventDefault();

        return false;
      }
    });
  },

});
