import Ember from 'ember';
import EmberTetherComponent from 'ember-tether/components/ember-tether';

const { $, computed, run, get } = Ember;

export default EmberTetherComponent.extend({

  /* Options */

  duration: null,
  effect: 'slide', // fade, grow, slide, null
  event: 'hover', // hover, click, focus, ready, or none
  hideOn: null,
  isVisible: false,
  position: 'bottom center',
  role: 'tooltip',
  showOn: null,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)

  /* Properties */

  'aria-hidden': computed.oneWay('isVisible'),
  attachment: computed.oneWay('position'),
  attributeBindings: ['aria-hidden', 'role', 'tabindex'],
  classNames: ['tooltip'],
  targetAttachment: 'top center',

  target: computed(function() {
    const parentView = this.get('parentView');

    if (!parentView) {
      console.warn('No parentView found');

      return null;
    } else {
      return `#${parentView.get('elementId')}`;
    }
  }),

  /* Private properties */

  _hideTimer: null,

  _duration: computed(function() {
    let duration = this.get('duration');

    if (typeof duration === 'number') {
      return duration;
    } else if (typeof duration === 'string') {
      let cleanDuration = parseInt(duration, 10);

      /* Remove invalid parseInt results */

      if (isNaN(cleanDuration) || !isFinite(cleanDuration)) {
        cleanDuration = null;
      }

      duration = cleanDuration;
    }

    return duration;
  }),

  _hideOn: computed(function() {
    let hideOn = this.get('hideOn');

    if (!hideOn) {
      const event  = this.get('event');

      switch (event) {
        case 'hover': hideOn = 'mouseleave'; break;
        case 'focus': hideOn = 'blur'; break;
        case 'ready': hideOn = null; break;
        default: hideOn = event; break;
      }
    }

    return hideOn;
  }),

  _showOn: computed(function() {
    let showOn = this.get('showOn');

    if (!showOn) {
      const event  = this.get('event');

      switch (event) {
        case 'hover': showOn = 'mouseenter'; break;
        default: showOn = event; break;
      }
    }

    return showOn;
  }),

  /* Methods */

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);

    const event = this.get('event');

    if (event !== 'none') {
      const _hideOn = this.get('_hideOn');
      const _showOn = this.get('_showOn');
      const $target = $(this.get('target'));

      /* If show and hide are the same (e.g. click), toggle
      the visibility */

      if (_showOn === _hideOn) {
        $target.on(_showOn, () => {
          this.toggleProperty('isVisible');
        });
      } else {

        /* Else, add the show and hide events individually */

        if (_showOn !== 'none') {
          $target.on(_showOn, () => {
            this.set('isVisible', true);
          });
        }

        if (_hideOn !== 'none') {
          $target.on(_hideOn, () => {
            this.set('isVisible', false);
          });
        }
      }

      /* Hide and show the tooltip on focus and escape
      for acessibility */

      if (event !== 'focus') {
        $target.focusin(() => {
          this.set('isVisible', true);
        });

        $target.focusout(() => {
          this.set('isVisible', false);
        });
      }

      $target.keydown((keyEvent) => {
        if (keyEvent.which === 27) {
          this.set('isVisible', false);
          keyEvent.preventDefault();

          return false;
        }
      });
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('isDestroying')) {
      return;
    }

    const isVisible = this.get('isVisible');

    if (isVisible) {
      const _duration = this.get('_duration');

      run.cancel(this.get('_hideTimer'));

      if (_duration) {

        /* Hide tooltip after specified duration */

        const hideTimer = run.later(() => {
          this.set('isVisible', false);
        }, _duration);

        /* Save timer ID for cancelling should an event
        hide the tooltop before the duration */

        this.set('_hideTimer', hideTimer);
      }
    }
  },

  willDestroy() {
    this._super(...arguments);

    const $target = $(this.get('target'));

    this.set('effect', null);
    this.set('isVisible', false);

    $target.removeAttr('aria-describedby');
    $target.off();
  },

});
