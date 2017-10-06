import Ember from 'ember';
import layout from '../templates/components/ember-tooltip-base';

const {
  computed,
  run,
} = Ember;

const ANIMATION_CLASS = 'ember-tooltip-show';
const ANIMATION_DURATION = 200; // In ms

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

export default Ember.Component.extend({
  classNames: ['ember-tooltip-base'],
  effect: 'slide', // Options: fade, slide, none
  event: 'hover', // Options: hover, click, focus, none
  hideOn: null,
  tooltipClassName: 'ember-tooltip', /* Custom classes */
  isShown: false,
  text: null,
  showOn: null,
  side: 'right',
  spacing: 20,
  targetId: null,
  // tagName: '', /* TODO - see if we can remove this element */
  layout,

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
        Ember.warn('No target found for targetId ', targetId);
      }
    } else {
      target = this.element.parentNode;
    }

    return target;
  }),

  /* An ID used to identify this tooltip from other tooltips */

  wormholeId: computed('elementId', function() {
    return `${this.get('elementId')}_wormhole`;
  }),

  _tooltipEvents: null,
  _tooltipElementRendered: false,
  _tooltipElementNotRendered: computed.not('_tooltipElementRendered'),
  _tooltip: null,

  init() {
    this._super(...arguments);
    this.set('_tooltipEvents', []);
  },

  didInsertElement() {
    this._super(...arguments);
    this.createTooltip();
  },

  didUpdateAttrs() {
    if (this.get('isShown')) {
      this.show();
    } else {
      this.hide();
    }
  },

  willDestroy() {
    const target = this.element.parentNode; /* TODO - enable target */
    const tooltip = this.get('_tooltip');

    this._super(...arguments);
    this.hide();

    /* Remove event listeners used to show and hide the tooltip */

    this.get('_tooltipEvents').each((tooltipEvent) => {
      const {
        callback,
        target,
        eventName,
      } = tooltipEvent;

      target.removeEventListener(eventName, callback);
    });

    tooltip.dispose();

    this.sendAction('onDestroy', this);
  },

  createTooltip() {
    const target = this.get('target');
    const tooltipClassName = this.get('tooltipClassName');
    const tooltipContent = this.get('text') || '<span></span>';
    const tooltip = new Tooltip(target, {
      html: true,
      offset: this.get('spacing'),
      placement: this.get('side'),
      title: tooltipContent,
      trigger: 'manual',
      template: `<div class="tooltip ${tooltipClassName} ember-tooltip-effect-${this.get('effect')}" role="tooltip">
                  <div class="tooltip-arrow ember-tooltip-arrow"></div>
                  <div class="tooltip-inner" id="${this.get('wormholeId')}"></div>
                 </div>`,

      popperOptions: {
        onCreate: (data) => {
          this.sendAction('onRender', this);
          this.set('_tooltipElementRendered', true);

          /* Once the wormhole has done it's work, we need the tooltip to be positioned */

          Ember.run.scheduleOnce('afterRender', () => {
            const popper = data.instance;

            popper.update();
          });
        },
      },
    });

    target.classList.add('ember-tooltip-target');

    this.set('_tooltip', tooltip);
  },

  hide() {

    if (this.get('isDestroying')) {
      return;
    }

    const _tooltip = this.get('_tooltip');

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    /* TODO - figure out why hide is called twice */
    _tooltip.popperInstance.popper.classList.remove(ANIMATION_CLASS);

    run.later(() => {
      _tooltip.hide();

      this.set('isShown', false);
      this.sendAction('onHide', this);
    }, ANIMATION_DURATION);
  },

  show() {

    console.log('show');

    if (this.get('isDestroying')) {
      return;
    }

    const delay = this.get('delay');
    const duration = this.get('duration');
    const _tooltip = this.get('_tooltip');
    const _showTimer = this.get('_showTimer');

    run.cancel(_showTimer);

    if (duration) {
      this.setHideTimer(duration);
    }

    if (delay) {
      this.setShowTimer(delay);
    } else {
      this._showTooltip();
    }

    this.sendAction('onShow', this);
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

      let shownTooltipsOrPopovers = $(`.${ANIMATION_CLASS}`);

      if (shownTooltipsOrPopovers.length) {
        delay = 0;
      }
    }

    const _showTimer = run.later(this, () => {
      if (!this.get('destroying') && !this.get('isDestroyed')) {
        this._showTooltip();
      }
    }, delay);

    this.set('_showTimer', _showTimer);
  },

  _showTooltip() {
    const _tooltip = this.get('_tooltip');

    console.log('_showTooltip');

    _tooltip.show();

    this.set('isShown', true); /* TODO - remove isShown? */

    run.later(() => {
      _tooltip.popperInstance.popper.classList.add(ANIMATION_CLASS);
    }, ANIMATION_DURATION);
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

    target.addEventListener(eventName, (event) => {
      run(() => {
        callback(event);
      });
    });
  },

});
