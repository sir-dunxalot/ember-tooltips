import Ember from 'ember';
import EmberTetherComponent from 'ember-tether/components/ember-tether';

const { $, computed, run } = Ember;

const defaultPosition = 'center';

let tooltipCounterId = 0;

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

export default EmberTetherComponent.extend({

  /* Options */

  delay: 0,
  delayOnChange: true,
  duration: 0,
  effect: 'slide', // fade, slide, none
  event: 'hover', // hover, click, focus, none
  hideOn: null,
  role: 'tooltip',
  side: 'top',
  showOn: null,
  spacing: 10,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)
  isShown: false,
  keepInWindow: true,

  /*
  When this property changes it repositions the tooltip.

  This isn't actually used in the code anywhere - it just
  needs to be passed as an attribute so didUpdate is
  triggered.

  @property updateFor
  */

  updateFor: null,

  /* Actions */

  onTooltipDestroy: null,
  onTooltipHide: null,
  onTooltipRender: null,
  onTooltipShow: null,

  /* Properties */

  attributeBindings: ['aria-hidden', 'role', 'tabindex'],
  classNameBindings: ['effectClass'],
  classPrefix: 'ember-tooltip-or-popover',
  classNames: ['ember-tooltip-or-popover'],

  _didUpdateTimeoutLength: 1000, // 1000 ms or 0 ms, depending whether in test mode
  _hideTimer: null,
  _showTimer: null,

  /* CPs */

  'aria-hidden': computed('isShown', function() {
    return this.get('isShown') ? 'false' : 'true';
  }),

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

  constraints: computed('keepInWindow', function() {
    let constraints;

    if (this.get('keepInWindow')) {
      constraints = [
        {
          to: 'window',
          attachment: 'together'
        }
      ];
    }

    return constraints;
  }),

  effectClass: computed(function() {
    return `${this.get('classPrefix')}-${this.get('effect')}`;
  }),

  positionClass: computed(function() {
    const targetAttachment = this.get('targetAttachment');
    const classPrefix = this.get('classPrefix');

    return `${classPrefix}-${targetAttachment.replace(' ', ` ${classPrefix}-`)}`;
  }),

  sideIsVertical: computed(function() {
    const side = this.get('side');

    return side === 'top' || side === 'bottom';
  }),

  target: computed(function() {
    const parentElement = this.$().parent();

    let parentElementId = parentElement.attr('id');

    if (!parentElementId) {
      parentElementId = `target-for-tooltip-${tooltipCounterId}`;

      tooltipCounterId++;

      parentElement.attr('id', parentElementId);
    }

    return `#${parentElementId}`;
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
    const classPrefix = this.get('classPrefix');

    return type ? `${classPrefix}-${type}` : null;
  }),

  /* Private CPs */

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

  hide() {

    if (this.get('isDestroying')) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    this.set('isShown', false);
    this.sendAction('onTooltipHide', this);
  },

  didInsertElement() {
    this._super(...arguments);

    const target = this.get('target');

    if (!target || target.indexOf('#') === -1) {
      Ember.assert('You must specify a target attribute in the format target="#element-id" for the tooltip component');
    }

    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);

    this.sendAction('onTooltipRender', this);

    $target.attr({
      'aria-describedby': `${this.get('elementId')}`,
      tabindex: $target.attr('tabindex') || this.get('tabindex'),
    });

    /* When this component has rendered we need
    to check if Tether moved its position to keep the
    element in bounds */

    let renderedSide;

    ['top', 'right', 'bottom', 'left'].forEach((side) => {
      if ($_tether.hasClass(`${this.get('classPrefix')}-target-attached-${side}`)) {
        renderedSide = side;
      }
    });

    /* We then use the side the tooltip was *actually*
    rendered on to set the correct offset from
    the target element */

    const spacing = this.get('spacing');

    let offset;

    switch(renderedSide) {
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

    this.set('offset', offset);
  },

  /*
  Repositions the tooltip if new attributes or content are
  passed to the tooltip.

  @method didUpdate
  */

  didUpdate() {
    this._super(...arguments);

    run.later(() => {
      this.positionTether();
      this.sendAction('onTooltipRender', this);
    }, this.get('_didUpdateTimeoutLength'));
  },

  /*
  We use an observer so the user can set isShown
  as a attribute.

  @method setTimer
  */

  setTimer: Ember.observer('isShown', function() {
    const isShown = this.get('isShown');

    if (isShown) {
      const duration = cleanNumber(this.get('duration'));

      run.cancel(this.get('_hideTimer'));

      if (duration) {

        /* Hide tooltip after specified duration */

        const hideTimer = run.later(this, this.hide, duration);

        /* Save timer ID for cancelling should an event
        hide the tooltop before the duration */

        this.set('_hideTimer', hideTimer);
      }
    }
  }),

  show() {
    // this.positionTether() fixes the issues raised in
    // https://github.com/sir-dunxalot/ember-tooltips/issues/75
    this.positionTether();

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

        let shownTooltipsOrPopovers = Ember.$(`.${this.get('classPrefix')}[aria-hidden="false"]`).length;

        if (shownTooltipsOrPopovers) {
          delay = 0;
        }
      }

      const _showTimer = run.later(this, () => {
        if (!this.get('destroying')) {
          this.set('isShown', true);
        }
      }, delay);

      this.set('_showTimer', _showTimer);
    } else {

      /* If there is no delay, show the tooltop immediately */

      this.set('isShown', true);
    }

    this.sendAction('onTooltipShow', this);
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
    const $target = $(this.get('target'));

    this.set('effect', null);
    this.hide();

    $target.removeAttr('aria-describedby');
    $target.off();

    this._super(...arguments); // Removes tether

    this.sendAction('onTooltipDestroy', this);
  },

});
