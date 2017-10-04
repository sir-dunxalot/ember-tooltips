import Ember from 'ember';
import layout from '../templates/components/ember-tooltip-simple';

const {
  computed,
  observer,
  run,
} = Ember;

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
  classNameBindings: ['isShown'],
  event: 'hover',
  hideOn: null,
  tooltipClassName: 'ember-tooltip',
  isShown: false,
  text: null,
  showOn: null,
  side: 'right',
  spacing: 10,
  targetId: null,
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
      target = document.getElementById(target);
    } else {
      target = this.element.parentNode;
    }

    return target;
  }),

  /* An ID used to identify this tooltip from other tooltips */

  wormholeId: computed('elementId', function() {
    return `${this.get('elementId')}_wormhole`;
  }),

  _tooltipElementRendered: false,
  _tooltipElementNotRendered: computed.not('_tooltipElementRendered'),
  _tooltip: null,

  didInsertElement() {
    this._super(...arguments);

    this.createTooltip();

    /* TODO - set aria-describedby and tabindex */

    if (!this.get('isShown')) {
      this._hide();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    // this.get('_tooltip').popper.update(); /* MAYBE */
  },

  willDestroy() {
    const target = this.element.parentNode; /* TODO - enable target */
    const tooltip = this.get('_tooltip');

    this._super(...arguments);
    this.hide();

    tooltip.dispose();

    /* TODO - call off on target events*/

    this.sendAction('onDestroy', this);
  },

  createTooltip() {
    const target = this.get('target');
    const tooltipContent = this.get('text') || '<span></span>';
    const tooltip = new Tooltip(target, {
      container: target,
      html: true,
      offset: this.get('spacing'),
      placement: this.get('side'),
      title: tooltipContent,
      trigger: 'manual',
      template: `<div class="tooltip ${this.get('tooltipClassName')}" role="tooltip">
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

    this.set('_tooltip', tooltip);
  },

  hide() {

    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    this._hide();
    this.sendAction('onHide', this);
  },

  /*
  We use an observer so the user can set isShown
  as a attribute.

  @method setTimer
  */

  setTimer: observer('isShown', function() {
    const isShown = this.get('isShown');

    if (isShown) {
      // this.startTether();
      const duration = cleanNumber(this.get('duration'));

      run.cancel(this.get('_hideTimer'));

      if (duration) {

        /* Hide tooltip after specified duration */

        const hideTimer = run.later(this, this.hide, duration);

        /* Save timer ID for canceling should an event
        hide the tooltip before the duration */

        this.set('_hideTimer', hideTimer);
      }
    } else {
      // this.stopTether();
    }
  }),

  show() {

    if (this.get('isDestroying')) {
      return;
    }

    const _showTimer = this.get('_showTimer');

    let delay = cleanNumber(this.get('delay'));

    run.cancel(_showTimer);

    if (delay) {
      if (!this.get('delayOnChange')) {

        /* If the `delayOnChange` property is set to false, we
        don't want to delay opening this tooltip/popover if there is
        already a tooltip/popover shown in the DOM. Check that here
        and adjust the delay as needed. */

        let shownTooltipsOrPopovers = $(`.${this.get('classPrefix')}-element[aria-hidden="false"]`).length;

        if (shownTooltipsOrPopovers) {
          delay = 0;
        }
      }

      const _showTimer = run.later(this, () => {
        if (!this.get('destroying') && !this.get('isDestroyed')) {
          this._show();
        }
      }, delay);

      this.set('_showTimer', _showTimer);
    } else {

      /* If there is no delay, show the tooltip immediately */

      this._show();
    }

    this.sendAction('onShow', this);
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

  _addListenerToTarget(eventName, callback) {
    const target = this.get('target');

    target.addEventListener(eventName, (event) => {
      callback(event);
    });

    /* TODO - store events for removing them on teardown*/
  },

  _hide() {
    this.get('_tooltip').hide();
    this.set('isShown', false);
  },

  _show() {
    this.get('_tooltip').show();
    this.set('isShown', true);
  },

});
