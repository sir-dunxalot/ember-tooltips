import Ember from 'ember';
import EmberTetherComponent from 'ember-tether/components/ember-tether';

const { $, computed, run, get } = Ember;

const defaultPosition = 'center';

export default EmberTetherComponent.extend({

  /* Options */

  duration: null,
  effect: 'slide', // fade, slide, none
  event: 'hover', // hover, click, focus, ready, or none
  hideOn: null,
  role: 'tooltip',
  side: 'top',
  showOn: null,
  spacing: 10,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)
  tooltipIsVisible: false,

  /* Properties */

  'aria-hidden': computed.oneWay('tooltipIsVisible'),
  attributeBindings: ['aria-hidden', 'role', 'tabindex'],
  classNameBindings: ['positionClass', 'effectClass', 'tooltipIsVisible'],
  classNames: ['tooltip'],

  attachment: computed(function() {
    const side = this.get('side');

    let horizontalPosition, verticalPosition;

    switch(side) {
      case 'top':
        horizontalPosition = defaultPosition;
        verticalPosition = 'bottom';
        break;
      case 'right':
        horizontalPosition = 'left';
        verticalPosition = defaultPosition;
        break;
      case 'bottom':
        horizontalPosition = defaultPosition;
        verticalPosition = 'top';
        break;
      case 'left':
        horizontalPosition = 'right';
        verticalPosition = defaultPosition;
        break;
    }

    return `${verticalPosition} ${horizontalPosition}`;
  }),

  effectClass: computed(function() {
    return `tooltip-${this.get('effect')}`;
  }),

  offset: computed(function() {
    const side = this.get('side');
    const spacing = this.get('spacing');
    let offset;

    switch(side) {
      case 'top':
        offset = `${spacing}px 0`;
        break;
      case 'right':
        offset = `0 -${spacing}px`;
        break;
      case 'bottom':
        offset = `-${spacing}px 0`;
        break;
      case 'left':
        offset = `0 ${spacing}px`;
        break;
    }

    return offset;
  }),

  positionClass: computed(function() {
    const targetAttachment = this.get('targetAttachment');

    return `tooltip-${targetAttachment.replace(' ', ' tooltip-')}`;
  }),

  sideIsVertical: computed(function() {
    const side = this.get('side');

    return side === 'top' || side === 'bottom';
  }),

  target: computed(function() {
    const parentView = this.get('parentView');

    if (!parentView) {
      console.warn('No parentView found');

      return null;
    } else {
      return `#${parentView.get('elementId')}`;
    }
  }),

  targetAttachment: computed(function() {
    const side = this.get('side');

    if (!this.get('sideIsVertical')) {
      return `center ${side}`;
    } else {
      return `${side} center`; // top and bottom
    }
  }),

  typeClass: computed(function() {
    const type = this.get('type');

    return type ? `tooltip-${type}` : null;
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

  close() {
    this.set('tooltipIsVisible', false);
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
          this.toggle();
        });
      } else {

        /* Else, add the show and hide events individually */

        if (_showOn !== 'none') {
          $target.on(_showOn, () => {
            this.open();
          });
        }

        if (_hideOn !== 'none') {
          $target.on(_hideOn, () => {
            this.close();
          });
        }
      }

      /* Hide and show the tooltip on focus and escape
      for acessibility */

      if (event !== 'focus') {
        $target.focusin(() => {
          this.open();
        });

        $target.focusout(() => {
          this.close();
        });
      }

      $target.keydown((keyEvent) => {
        if (keyEvent.which === 27) {
          this.close();
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

    const tooltipIsVisible = this.get('tooltipIsVisible');

    if (tooltipIsVisible) {
      const _duration = this.get('_duration');

      run.cancel(this.get('_hideTimer'));

      if (_duration) {

        /* Hide tooltip after specified duration */

        const hideTimer = run.later(() => {
          this.close();
        }, _duration);

        /* Save timer ID for cancelling should an event
        hide the tooltop before the duration */

        this.set('_hideTimer', hideTimer);
      }
    }
  },

  open() {
    this.set('tooltipIsVisible', true);
  },

  toggle() {
    this.toggleProperty('tooltipIsVisible');
  },

  willDestroy() {
    const $target = $(this.get('target'));

    this.set('effect', null);
    this.close();

    $target.removeAttr('aria-describedby');
    $target.off();

    this._super(...arguments); // Removes thether
  },

});
