import { deprecatingAlias } from '@ember/object/computed';
import $ from 'jquery';
import { assert } from '@ember/debug';
import { observer, computed } from '@ember/object';
import { run } from '@ember/runloop';
import EmberTetherComponent from 'ember-tether/components/ember-tether';
import { dispatchAction } from '../utils';

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

  didReceiveAttrs() {
    this._super(...arguments);

    const passedPropertiesObject = this.get('passedPropertiesObject');

    if (passedPropertiesObject) {
      this.setProperties(passedPropertiesObject);
    }
  },

  /* Options */

  delay: 0,
  delayOnChange: true,
  duration: 0,
  effect: 'slide', // Options: fade, slide, none
  event: 'hover', // Options: hover, click, focus, none
  hideOn: null,
  role: 'tooltip',
  side: 'top',
  showOn: null,
  spacing: 10,
  tabindex: '0', // A positive integer (to enable) or -1 (to disable)
  isShown: false,
  tooltipIsVisible: deprecatingAlias('isShown', {
    id: 'tooltip-and-popover.tooltipIsVisible',
    until: '3.0.0',
  }),
  keepInWindow: true,

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

  onTooltipDestroy: deprecatingAlias('onDestroy', {
    id: 'tooltip-and-popover.onTooltipDestroy',
    until: '3.0.0',
  }),
  onTooltipHide: deprecatingAlias('onHide', {
    id: 'tooltip-and-popover.onTooltipHide',
    until: '3.0.0',
  }),
  onTooltipRender: deprecatingAlias('onRender', {
    id: 'tooltip-and-popover.onTooltipRender',
    until: '3.0.0',
  }),
  onTooltipShow: deprecatingAlias('onShow', {
    id: 'tooltip-and-popover.onTooltipShow',
    until: '3.0.0',
  }),

  /* Properties */

  attributeBindings: ['role', 'tabindex'],
  classNameBindings: ['effectClass'],
  classPrefix: 'ember-tooltip-or-popover',

  _didUpdateTimeoutLength: 1000, // 1000 ms or 0 ms, depending whether in test mode
  _hideTimer: null,
  _showTimer: null,
  _isTetherEnabled: true,

  /* CPs */

  /**
   * The attributeBindings are handled asynchronously
   *
   * http://stackoverflow.com/a/18731021/3304337
   *
   * This observer makes it sync, which makes testing
   * more consistent.
   *
   * @method dataTetherEnabledHandler
   * @public
   */

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

    let horizontalPosition;
    let verticalPosition;

    switch (side) {
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

  constraints: computed('keepInWindow', 'setPin', function() {
    let constraints;

    if (this.get('keepInWindow')) {
      constraints = [
        {
          to: 'window',
          attachment: 'together',
          pin: this.get('setPin'),
        },
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
    const $element = this.$();

    /* It's not possible to access the DOM when
    running in Fastboot
    */

    if (!$element) {
      return null;
    }

    const parentElement = $element.parent();
    let parentElementId = parentElement && parentElement.attr('id');

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
      return `${side} center`;
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

    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this.get('_showTimer'));

    this.set('isShown', false);

    dispatchAction(this, 'onHide');

    this.stopTether();
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('_shouldShowOnRender')) {
      this.show();
    }

    const target = this.get('target');

    if (!target || target.indexOf('#') === -1) {
      assert('You must specify a target attribute in the format target="#element-id" for the tooltip component');
    }

    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $tether = $(_tether.element);

    dispatchAction(this, 'onRender');

    $target.attr({
      'aria-describedby': `${this.get('elementId')}`,
      tabindex: $target.attr('tabindex') || this.get('tabindex'),
    });

    /* Needed so that these 'aria-hidden' and
    'data-tether-enabled' don't init to undefined
    */

    this.ariaHiddenHandler();
    this.dataTetherEnabledHandler();

    /* When this component has rendered we need
    to check if Tether moved its position to keep the
    element in bounds */

    let renderedSide;

    ['top', 'right', 'bottom', 'left'].forEach((side) => {
      if ($tether.hasClass(`${this.get('classPrefix')}-target-attached-${side}`)) {
        renderedSide = side;
      }
    });

    /* We then use the side the tooltip was *actually*
    rendered on to set the correct offset from
    the target element */

    const spacing = this.get('spacing');

    let offset;

    switch (renderedSide) {
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

      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      dispatchAction(this, 'onRender');
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

    /* Calling this.positionTether() fixes the issues raised in
    https://github.com/sir-dunxalot/ember-tooltips/issues/75
    */

    this.positionTether();

    if (this.isDestroying || this.isDestroyed) {
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

    dispatchAction(this, 'onShow');
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

  willDestroyElement() {

    /* There's no jQuery when running in Fastboot */

    const $target = $ && $(this.get('target'));

    this.set('effect', null);
    if (this.get('isShown')) {
      this.hide();
    }

    if ($target) {
      $target.removeAttr('aria-describedby');
      $target.off();
    }

    run.cancel(this._startTether);
    run.cancel(this._stopTether);

    this._super(...arguments); // Removes tether

    dispatchAction(this, 'onDestroy');
  },

  startTether() {
    this._startTether = run.schedule('afterRender', () => {
      if (!this.isDestroyed && !this.isDestroying) {

        /* We can't depend on `_tether.enabled` because
          it's not an Ember property (so won't trigger CP
          update when changed)
          */

        this.set('_isTetherEnabled', true);
        this.get('_tether').enable();
      }
    });
  },

  stopTether() {
    this._stopTether = run.schedule('afterRender', () => {
      if (!this.isDestroyed && !this.isDestroying) {

        /* We can't depend on `_tether.enabled` because
        it's not an Ember property (so won't trigger CP
        update when changed)
        */

        this.set('_isTetherEnabled', false);
        this.get('_tether').disable();
      }
    });
  },

  _tetherDidChange() {
    this.removeTether(this._tether);
    this.addTether();
  },

  tetherDidChange: observer(
    'classPrefix',
    'target',
    'attachment',
    'targetAttachment',
    'offset',
    'targetOffset',
    'targetModifier',
    'constraints',
    'optimizations',
    function() {
      if (this.element) {
        this._tetherDidChange();
      } else {
        run.schedule('afterRender', () => this._tetherDidChange());
      }
    }
  ),
});
