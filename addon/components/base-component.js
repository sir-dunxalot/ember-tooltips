import Ember from 'ember';
import EmberPopperComponent from 'ember-popper/components/ember-popper';

const {
  computed,
  observer,
  run,
} = Ember;

export default EmberPopperComponent.extend({

  /* Options */

  delay: 0,
  delayOnChange: true,
  duration: 0,
  effect: 'slide', // Options: fade, slide, none
  event: 'hover', // Options: hover, click, focus, none
  hideOn: null,
  role: 'tooltip',
  side: 'top', // Options: auto, top, right, bottom, left
  showOn: null,
  spacing: 10,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)
  isShown: false,
  // keepInWindow: true,

  /* ember-popper overwrites */

  placement: computed.readOnly('side'),
  renderInPlace: true,

  /**
  When this property changes it repositions the tooltip.

  This isn't actually used in the code anywhere - it just
  needs to be passed as an attribute so didUpdate is
  triggered.

  @property updateFor
  @public
  */

  updateFor: null,

  /* Actions */

  onDestroy: null,
  onHide: null,
  onRender: null,
  onShow: null,

  /* Properties */

  // attributeBindings: ['role', 'tabindex'],
  // classNameBindings: ['effectClass'],
  classPrefix: 'ember-tooltip-or-popover',

  _didUpdateTimeoutLength: 1000, // 1000 ms or 0 ms, depending whether in test mode
  _hideTimer: null,
  _showTimer: null,

  ariaHiddenHandler: observer('isShown', function() {
    let ariaHiddenString = this.get('isShown') ? 'false' : 'true';
    // let $element = this.$();

    // if ($element && $element.attr) {
    //   $element.attr('aria-hidden', ariaHiddenString);
    // }
  }),

  effectClass: computed(function() {
    return `${this.get('classPrefix')}-${this.get('effect')}`;
  }),

  /* Private CPs */

  _hideOn: computed(function() {
    let hideOn = this.get('hideOn');

    if (!hideOn) {
      const event  = this.get('event');

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
    }

    return hideOn;
  }),

  _showOn: computed(function() {
    let showOn = this.get('showOn');

    if (!showOn) {
      const event  = this.get('event');

      switch (event) {
        case 'hover':
          showOn = 'mouseenter';
          break;
        default:
          showOn = event;
          break;
      }
    }

    return showOn;
  }),

  /* Methods */

  hide() {

    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    this.set('isShown', false);

    this.sendAction('onHide', this);

    this.stopTether();
  },

  didInsertElement() {

    this._super(...arguments);

    if (this.get('_shouldShowOnRender')) {
      this.show();
    }

    /* TODO - target is undefined here */

    const target = this.get('target');

    if (!this.get('renderInPlace') && !target) {
      assert('You must specify a target attribute');
    }

    const $target = $(this.get('target'));

    this.sendAction('onRender', this);

    $target.attr({
      'aria-describedby': `${this.get('elementId')}`,
      tabindex: $target.attr('tabindex') || this.get('tabindex'),
    });

    // /* Needed so that these 'aria-hidden' and
    // 'data-tether-enabled' don't init to undefined
    // */

    this.ariaHiddenHandler();

    if (!this.get('isShown')) {
      this.stopTether();
    }
  },

  didUpdateAttrs() { /* Or didUpdate ? */
    this._super(...arguments);

    run.later(() => {
      this._updateRAF = requestAnimationFrame(() => {
        this._updatePopper();
      });

      this.sendAction('onRender', this);
    }, this.get('_didUpdateTimeoutLength'));
  },

  /*
  We use an observer so the user can set isShown
  as a attribute.

  @method setTimer
  */

  setTimer: observer('isShown', function() {
    const isShown = this.get('isShown');

    if (isShown) {
      this.startTether();
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
      this.stopTether();
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
          this.startTether();
          this.set('isShown', true);
        }
      }, delay);

      this.set('_showTimer', _showTimer);
    } else {

      /* If there is no delay, show the tooltip immediately */

      this.startTether();
      this.set('isShown', true);
    }

    this.sendAction('onShow', this);
  },

  startTether() {
    this._popper.update();
  },

  stopTether() {
    run.schedule('afterRender', () => {
      if (!this.isDestroyed && !this.isDestroying) {

        this._popper.destroy();
        cancelAnimationFrame(this._updateRAF);
      }
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

  willDestroy() {

    /* There's no jQuery when running in Fastboot */

    const $target = $ && $(this.get('target'));

    this.set('effect', null);
    this.hide();

    if ($target) {
      $target.removeAttr('aria-describedby');
      $target.off();
    }

    this._super(...arguments);

    this.sendAction('onDestroy', this);
  },

});

/* TODO
spacing
remove startTether and stopTether ?
effect class
attributeBindings
ariaHiddenHandler
*/
