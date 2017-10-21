/* global tippy */

import Ember from 'ember';
import layout from '../templates/components/ember-tooltip-base';

const {
  $,
  computed,
  run,
  warn,
  Component,
  RSVP,
} = Ember;

const ANIMATION_CLASS = 'ember-tooltip-show';

function cleanNumber(stringOrNumber) {
  let cleanNumber;

  if (stringOrNumber && typeof stringOrNumber === 'string') {
    cleanNumber = parseInt(stringOrNumber, 10);

    /* Remove invalid parseInt results */

    if (isNaN(cleanNumber) || !isFinite(cleanNumber)) {
      cleanNumber = 0;
    }
  } else {
    cleanNumber = stringOrNumber;
  }

  return cleanNumber;
}

export default Component.extend({
  classNames: ['ember-tooltip-base'],
  delay: 0,
  delayOnChange: true,
  duration: 0,
  effect: 'slide', // Options: fade, slide, none
  event: 'hover', // Options: hover, click, focus, none
  tooltipClassName: 'ember-tooltip', /* Custom classes */
  isShown: false,
  text: null,
  side: 'top',
  spacing: 10,
  targetId: null,
  layout,
  updateFor: null,

  /* Actions */

  onDestroy: null,
  onHide: null,
  onRender: null,
  onShow: null,

  hideOn: computed('event', function() {
    const event  = this.get('event');

    let hideOn;

    switch (event) {
      case 'hover':
        hideOn = 'mouseleave';
        break;
      case 'focus':
        hideOn = 'blur';
        break;
      case 'ready':
        hideOn = null;
        break;
      default:
        hideOn = event;
        break;
    }

    return hideOn;
  }),

  showOn: computed('event', function() {
    const event  = this.get('event');

    let showOn;

    switch (event) {
      case 'hover':
        showOn = 'mouseenter';
        break;
      default:
        showOn = event;
        break;
    }

    return showOn;
  }),

  target: computed('targetId', function() {
    const targetId = this.get('targetId');

    let target;

    if (targetId) {
      target = document.getElementById(targetId);

      if (!target) {
        warn('No target found for targetId ', targetId);
      }
    } else {
      target = this.element.parentNode;
    }

    return target;
  }),

  /* An ID used to identify this tooltip from other tooltips */

  wormholeId: computed('elementId', function() {
    return `${this.get('elementId')}-wormhole`;
  }),

  _animationDuration: 200, // In ms
  _tooltipElementNotRendered: computed.not('_tooltipElementRendered'),
  _tooltipElementRendered: false,
  _tooltipEvents: null,
  _tooltip: null,

  init() {
    this._super(...arguments);
    this.set('_tooltipEvents', []);
  },

  didInsertElement() {
    this._super(...arguments);

    this.createTooltip().then(() => {

    });
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.get('isShown')) {
      this.show();

      /* If updateFor exists, update the tooltip incase the changed Attr affected the tooltip content's height or width */

      if (this.get('updateFor') && this.get('_tooltip').popperInstance) {
        const popper = this.get('_tooltip').popperInstance;

        if (popper) {
          run(popper.update);
        }
      }
    } else {
      this.hide();
    }
  },

  willDestroy() {
    this._super(...arguments);
    this.hide();

    const _tooltipEvents = this.get('_tooltipEvents');

    /* Remove event listeners used to show and hide the tooltip */

    _tooltipEvents.forEach((tooltipEvent) => {
      const {
        callback,
        target,
        eventName,
      } = tooltipEvent;

      run(() => {
        target.removeEventListener(eventName, callback);
      });
    });

    run(() => {
      const _tooltip = this.get('_tooltip');

      _tooltip.destroy(_tooltip.getPopperElement(this.get('target')));
    });

    this.sendAction('onDestroy', this);
  },

  addTargetEventListeners() {
    this.addTooltipTargetEventListeners();
  },

  addTooltipBaseEventListeners() {

  },

  addTooltipTargetEventListeners() {

    /* Setup event handling to hide and show the tooltip */

    const event = this.get('event');

    /* Setup event handling to hide and show the tooltip */

    if (event === 'none') {
      return;
    }

    const hideOn = this.get('hideOn');
    const showOn = this.get('showOn');

    /* If show and hide are the same (e.g. click) toggle
    the visibility */

    if (showOn === hideOn) {
      this._addEventListener(showOn, () => {
        this.toggle();
      });
    } else {

      /* Else, add the show and hide events individually */

      if (showOn !== 'none') {
        this._addEventListener(showOn, () => {
          this.show();
        });
      }

      if (hideOn !== 'none') {
        this._addEventListener(hideOn, () => {
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
        this._addEventListener('focusin', () => {
          this.show();
        });
      }

      this._addEventListener('focusout', () => {
        this.hide();
      });
    }

    this._addEventListener('keydown', (keyEvent) => {
      run(() => { // TODO - keep?
        if (keyEvent.which === 27) {
          this.hide();

          keyEvent.preventDefault();

          return false;
        }
      });
    });
  },

  createTooltip() {
    return new RSVP.Promise((resolve, reject) => {

      try {
        run(() => {
          const target = this.get('target');
          const tooltipClassName = this.get('tooltipClassName');
          const tooltipContent = this.get('text') || '<span></span>';
          const tooltip = tippy(target, {
            distance: this.get('offset'),
            html: () => {
              const div = document.createElement('div');

              div.id = this.get('wormholeId');

              return div;
            },
            arrow: true,
            // interactive: true if popover,
            size: 'regular',
            // multiple: true,
            performance: true,
            position: this.get('side'),
            // title: tooltipContent,
            trigger: 'manual',
            // template: `<div class="tooltip ${tooltipClassName} ember-tooltip-effect-${this.get('effect')}" role="tooltip">
            //             <div class="tooltip-arrow ember-tooltip-arrow"></div>
            //             <div class="tooltip-inner" id="${this.get('wormholeId')}"></div>
            //            </div>`,

            popperOptions: {

              onCreate: (tooltipData) => {
                run(() => {

                  this.sendAction('onRender', this);

                  this.set('_tooltipElementRendered', true);

                  /* The tooltip element must exist in order to add event listeners to it */

                  this.addTooltipBaseEventListeners();

                  /* Once the wormhole has done it's work, we need the tooltip to be positioned again */

                  run.scheduleOnce('afterRender', () => {
                    const popperInstance = tooltipData.instance;

                    popperInstance.state.updateBound();
                  });

                  resolve(tooltipData);
                });
              },
            },
          });

          /* Add a class to the tooltip target */

          target.classList.add('ember-tooltip-target');

          this.addTargetEventListeners();
          this.set('_tooltip', tooltip);

          /* If user passes isShown=true, show the tooltip as soon as it's created */

          if (this.get('isShown')) {
            tooltip.show();
            this.show();
          }
        });
      } catch(error) {
        reject(error);
      }
    });
  },

  hide() {

    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    this._hideTooltip();
  },

  show() {

    if (this.get('isDestroying')) {
      return;
    }

    const delay = this.get('delay');
    const duration = this.get('duration');

    run.cancel(this.get('_showTimer'));

    if (duration) {
      this.setHideTimer(duration);
    }

    if (delay) {
      this.setShowTimer(delay);
    } else {
      this._showTooltip();
    }
  },

  setHideTimer(duration) {
    duration = cleanNumber(duration);

    run.cancel(this.get('_hideTimer'));

    if (duration) {

      /* Hide tooltip after specified duration */

      const hideTimer = run.later(this, this.hide, duration);

      /* Save timer ID for canceling should an event
      hide the tooltip before the duration */

      this.set('_hideTimer', hideTimer);
    }
  },

  setShowTimer(delay) {
    delay = cleanNumber(delay);

    if (!this.get('delayOnChange')) {

      /* If the `delayOnChange` property is set to false, we
      don't want to delay opening this tooltip/popover if there is
      already a tooltip/popover shown in the DOM. Check that here
      and adjust the delay as needed. */

      let shownTooltipsOrPopovers = $(`.${ANIMATION_CLASS}`); /* TODO */

      if (shownTooltipsOrPopovers.length) {
        delay = 0;
      }
    }

    const _showTimer = run.later(this, () => {
      this._showTooltip();
    }, delay);

    this.set('_showTimer', _showTimer);
  },

  _hideTooltip() {

    if (this.get('isDestroying')) {
      return;
    }

    const _tooltip = this.get('_tooltip');

    // _tooltip.popperInstance.popper.classList.remove(ANIMATION_CLASS);

    run.later(() => {

      if (this.get('isDestroying')) {
        return;
      }

      _tooltip.hide(_tooltip.getPopperElement(this.get('target')));

      this.set('isShown', false);
      this.sendAction('onHide', this);
    }, this.get('_animationDuration'));
  },

  _showTooltip() {

    if (this.get('isDestroying')) {
      return;
    }

    const _tooltip = this.get('_tooltip');

    _tooltip.show(_tooltip.getPopperElement(this.get('target')));

    this.set('isShown', true);

    run(() => {
      if (this.get('isDestroying')) {
        return;
      }

      // _tooltip.popperInstance.popper.classList.add(ANIMATION_CLASS);

      this.sendAction('onShow', this);
    });
  },

  toggle() {

    /* We don't use toggleProperty because we centralize
    logic for showing and hiding in the show() and hide()
    methods. */

    if (this.get('isShown')) {
      this.hide();
    } else {
      this.show();
    }
  },

  _addEventListener(eventName, callback, element) {
    const target = element || this.get('target');

    /* Remember event listeners so they can removed on teardown */

    this.get('_tooltipEvents').push({
      callback,
      target,
      eventName,
    });

    /* Add the event listeners */

    run(() => {
      target.addEventListener(eventName, (event) => {
        callback(event);
      });
    });
  },

});
