import Ember from 'ember';
import EmberTetherComponent from 'ember-tether/components/ember-tether';

const { $, computed, observer, run, on } = Ember;

const defaultPosition = 'center';

let tooltipOrPopoverCounterId = 0;

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

  passedPropertiesObject: null,
  setPropertiesWithPassedPropertiesObject: on('didReceiveAttrs', function() {
    this._super(...arguments);

    let passedPropertiesObject = this.get('passedPropertiesObject');
    if (passedPropertiesObject) {
      this.setProperties(passedPropertiesObject);
    }
  }),

  /* Options */

  delayOnChange: true,
  duration: 0,
  effect: 'slide', // fade, slide, none
  event: 'hover', // hover, click, focus, none
  hideOn: null,
  isShown: false,
  keepInWindow: true,
  role: 'tooltip',
  side: 'top',
  showDelay: 0,
  showOn: null,
  spacing: 10,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)

  /*
  When this property changes it repositions the tooltip.

  This isn't actually used in the code anywhere - it just
  needs to be passed as an attribute so didUpdate is
  triggered.

  @property updateFor
  */

  updateFor: null,

  /* Actions */

  onDestroy: null,
  onHide: null,
  onRender: null,
  onShow: null,

  /* Properties */

  attributeBindings: ['role', 'tabindex'],
  classNameBindings: ['effectClass'],
  classPrefix: 'ember-tooltip-or-popover',

  _didUpdateTimeoutLength: 1000, // 1000 ms or 0 ms, depending whether in test mode
  _hideTimer: null,
  _showTimer: null,
  _isTetherEnabled: true,

  /* CPs */

  // attributeBindings are handled asynchronously http://stackoverflow.com/a/18731021/3304337
  // this observer makes it sync, which makes testing more consistent
  dataTetherEnabledHandler: observer('_isTetherEnabled', function() {
    let tetherEnabledString = this.get('_isTetherEnabled') ? 'true' : 'false';
    let $element = this.$();
    if ($element && $element.attr) {
      $element.attr('data-tether-enabled', tetherEnabledString);
    }
  }),

  ariaHiddenHandler: observer('isShown', function() {
    let ariaHiddenString = this.get('isShown') ? 'false' : 'true';
    let $element = this.$();
    if ($element && $element.attr) {
      $element.attr('aria-hidden', ariaHiddenString);
    }
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
      parentElementId = `target-for-tooltip-or-popover-${tooltipOrPopoverCounterId}`;

      tooltipOrPopoverCounterId++;

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

    this.sendAction('onHide', this);

    this.stopTether();
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('_shouldShowOnRender')) {
      this.show();
    }

    const target = this.get('target');

    if (!target || target.indexOf('#') === -1) {
      Ember.assert('You must specify a target attribute in the format target="#element-id" for the tooltip component');
    }

    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);

    this.sendAction('onRender', this);

    $target.attr({
      'aria-describedby': `${this.get('elementId')}`,
      tabindex: $target.attr('tabindex') || this.get('tabindex'),
    });

    // needed so that these 'aria-hidden' and
    // 'data-tether-enabled' don't init to undefined
    this.ariaHiddenHandler();
    this.dataTetherEnabledHandler();

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

    if (!this.get('isShown')) {
      this.stopTether();
    }
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
    // this.positionTether() fixes the issues raised in
    // https://github.com/sir-dunxalot/ember-tooltips/issues/75
    this.positionTether();

    if (this.get('isDestroying')) {
      return;
    }

    const _showTimer = this.get('_showTimer');

    let showDelay = cleanNumber(this.get('showDelay'));

    run.cancel(_showTimer);

    if (showDelay) {
      if (!this.get('delayOnChange')) {

        /* If the `delayOnChange` property is set to false, we
        don't want to delay opening this tooltip/popover if there is
        already a tooltip/popover shown in the DOM. Check that here
        and adjust the delay as needed. */

        let shownTooltipsOrPopovers = Ember.$(`.${this.get('classPrefix')}-element[aria-hidden="false"]`).length;

        if (shownTooltipsOrPopovers) {
          showDelay = 0;
        }
      }

      const _showTimer = run.later(this, () => {
        if (!this.get('destroying') && !this.get('isDestroyed')) {
          this.startTether();
          this.set('isShown', true);
        }
      }, showDelay);

      this.set('_showTimer', _showTimer);
    } else {

      /* If there is no delay, show the tooltip immediately */

      this.startTether();
      this.set('isShown', true);
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

  willDestroy() {
    const $target = $(this.get('target'));

    this.set('effect', null);
    this.hide();

    $target.removeAttr('aria-describedby');
    $target.off();

    this._super(...arguments); // Removes tether

    this.sendAction('onDestroy', this);
  },

  startTether() {
    // can't depend on `_tether.enabled` because it's not an
    // Ember property (so won't trigger cp update when changed)
    this.set('_isTetherEnabled', true);
    this.get('_tether').enable();
  },

  stopTether() {
    run.schedule('afterRender', () => {
      // can't depend on `_tether.enabled` because it's not an
      // Ember property (so won't trigger cp update when changed)
      this.set('_isTetherEnabled', false);
      this.get('_tether').disable();
    });
  },

});
