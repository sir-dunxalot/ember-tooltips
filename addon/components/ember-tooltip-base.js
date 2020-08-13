import Tooltip from 'tooltip.js';
import Ember from 'ember';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { deprecatingAlias } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import { warn } from '@ember/debug';
import { capitalize, w } from "@ember/string";
import Component from '@ember/component';
import layout from '../templates/components/ember-tooltip-base';

const ANIMATION_CLASS = 'ember-tooltip-show';
const POPPER_DEFAULT_MODIFIERS = {
  flip: {
    enabled: true,
  },
  preventOverflow: {
    escapeWithReference: true
  }
};

function getOppositeSide(placement) {
  if (!placement) {
    return null;
  }

  const [side] = placement.split('-');
  let oppositeSide;

  switch (side) {
    case 'top':
      oppositeSide = 'bottom';
      break;
    case 'right':
      oppositeSide = 'left';
      break;
    case 'bottom':
      oppositeSide = 'top';
      break;
    case 'left':
      oppositeSide = 'right';
      break;
  }

  return oppositeSide;
}

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
  effect: 'slide', // Options: fade, slide, none // TODO - make slide work
  event: 'hover', // Options: hover, click, focus, none
  tooltipClass: 'tooltip',
  arrowClass: 'tooltip-arrow',
  innerClass: 'tooltip-inner',
  tooltipClassName: deprecatingAlias('_tooltipVariantClass', {
    id: 'EmberTooltipBase._tooltipVariantClass',
    until: '4.0.0',
  }),
  isShown: false,
  text: null,
  side: 'top',
  spacing: 10,
  targetId: null,
  layout,
  updateFor: null,
  popperOptions: null,
  popperContainer: false,
  animationDuration: 200,

  /* Actions */

  onDestroy: null,
  onHide: null,
  onRender: null,
  onShow: null,

  _hideOn: null,
  hideOn: computed('_hideOn', 'event', {
    get() {
      if (this._hideOn) {
        return this._hideOn;
      }

      const event  = this.event;

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
    },
    set(_key, value) {
      return this._hideOn = value;
    }
  }),

  _showOn: null,
  showOn: computed('_showOn', 'event', {
    get() {
      if (this._showOn) {
        return this._showOn;
      }

      const event  = this.event;

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
    },
    set(_key, value) {
      return this._showOn = value;
    }
  }),

  target: computed('element.parentNode', 'targetId', function() {
    const targetId = this.targetId;

    let target;

    if (targetId) {
      target = document.getElementById(targetId);

      if (!target) {
        warn('No target found for targetId ', targetId, {
          id: 'ember-tooltips.no-element-with-targetId'
        });
      }
    } else {
      target = this.element.parentNode;
    }

    return target;
  }),

  /* An ID used to identify this tooltip from other tooltips */

  _renderElementId: computed('elementId', function() {
    const elementId = this.elementId;
    if (elementId) {
      return `${elementId}-et-target`;
    } else {
      return null;
    }
  }),

  _renderElement: computed('_renderElementId', function() {
    const renderElementId = this._renderElementId;
    if (renderElementId) {
      return document.getElementById(renderElementId);
    } else {
      return null;
    }
  }),

  _fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  _shouldRenderContent: computed(
    '_fastboot.isFastBoot',
    '_awaitingTooltipElementRendered',
    function() {
    return this._fastboot.isFastBoot ||
      !this._awaitingTooltipElementRendered;
  }),

  _awaitingTooltipElementRendered: true,
  _tooltipEvents: null,
  _tooltip: null,
  _spacingRequestId: null,

  _animationDuration: computed('animationDuration', function() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const inTestingMode = config.environment === 'test' || Ember.testing;

    return inTestingMode ? 0 : this.animationDuration;
  }),

  init() {
    this._super(...arguments);
    this.set('_tooltipEvents', []);
  },

  didInsertElement() {
    this._super(...arguments);
    this.createTooltip();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.isShown) {
      this.show();

      /* If updateFor exists, update the tooltip incase the changed Attr affected the tooltip content's height or width */

      if (this.updateFor !== null && this._tooltip.popperInstance) {
        this._updatePopper();
      }
    } else {
      this.hide();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    const _tooltipEvents = this._tooltipEvents;

    /* Remove event listeners used to show and hide the tooltip */

    _tooltipEvents.forEach(({ callback, target, eventName } = {}) => {
      target.removeEventListener(eventName, callback);
    });

    this._cleanupTimers();

    this._tooltip.dispose();

    this._dispatchAction('onDestroy', this);
  },

  addTargetEventListeners() {
    this.addTooltipTargetEventListeners();
  },

  addTooltipBaseEventListeners() {

  },

  addTooltipTargetEventListeners() {

    /* Setup event handling to hide and show the tooltip */

    const event = this.event;

    /* Setup event handling to hide and show the tooltip */

    if (event === 'none') {
      return;
    }

    const hideOn = this.hideOn;
    const showOn = this.showOn;

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

      if (keyEvent.which === 27 && this.isShown) {
        this.hide();
        keyEvent.stopImmediatePropagation(); /* So this callback only fires once per keydown */
        keyEvent.preventDefault();
        return false;
      }
    }, document);
  },

  createTooltip() {
    const target = this.target;
    const tooltipClass = this.tooltipClass;
    const arrowClass = this.arrowClass;
    const innerClass = this.innerClass;
    const emberTooltipClass = this._tooltipVariantClass;
    const emberTooltipArrowClass = `${w(emberTooltipClass).join('-arrow ')}-arrow`;
    const emberTooltipInnerClass = `${w(emberTooltipClass).join('-inner ')}-inner`;

    const targetTitle = target.title;

    target.removeAttribute('title');

    const tooltip = new Tooltip(target, {
      container: this.popperContainer,
      html: true,
      placement: this.side,
      title: '<span></span>',
      trigger: 'manual',
      arrowSelector: `.${w(emberTooltipArrowClass).join('.')}`,
      innerSelector: `.${w(emberTooltipInnerClass).join('.')}`,
      template: `<div
                   class="${tooltipClass} ${emberTooltipClass} ember-tooltip-effect-${this.effect}"
                   role="tooltip"
                   style="margin:0;margin-${getOppositeSide(this.side)}:${this.spacing}px;"
                 >
                   <div class="${arrowClass} ${emberTooltipArrowClass}"></div>
                   <div class="${innerClass} ${emberTooltipInnerClass}" id="${this._renderElementId}"></div>
                 </div>`,

      popperOptions: {
        modifiers: mergeModifiers(
          POPPER_DEFAULT_MODIFIERS,
          // We could use optional chaining instead but at the moment it doesn't work with modern targets
          // https://github.com/ember-cli/ember-cli/issues/9290
          this.popperOptions ? this.popperOptions.modifiers : undefined
        ),

        onCreate: () => {
          run(() => {

            this._dispatchAction('onRender', this);

            this.set('_awaitingTooltipElementRendered', false);

            /* The tooltip element must exist in order to add event listeners to it */

            this.addTooltipBaseEventListeners();

            /* Once the wormhole has done it's work, we need the tooltip to be positioned again */
            run.scheduleOnce('afterRender', this, this._updatePopper);

            target.setAttribute('title', targetTitle);
          });
        },

        onUpdate: () => {
          this.setSpacing();
        },
      },
    });

    /* Add a class to the tooltip target */

    target.classList.add('ember-tooltip-target');

    this.addTargetEventListeners();
    this.set('_tooltip', tooltip);

    /* If user passes isShown=true, show the tooltip as soon as it's created */

    if (this.isShown) {
      this.show();
    }
  },

  _updatePopper() {
    const { popperInstance } = this._tooltip;
    popperInstance.update();
  },

  setSpacing() {
    if (!this.isShown || this.isDestroying) {
      return;
    }

    this._spacingRequestId = requestAnimationFrame(() => {
      this._spacingRequestId = null;

      if (!this.isShown || this.isDestroying) {
        return;
      }

      const { popperInstance } = this._tooltip;
      const { popper } = popperInstance;
      const side = popper.getAttribute('x-placement');
      const marginSide = getOppositeSide(side);
      const { style } = popper;

      style.marginTop = 0;
      style.marginRight = 0;
      style.marginBottom = 0;
      style.marginLeft = 0;

      popper.style[`margin${capitalize(marginSide)}`] = `${this.spacing}px`;
    });
  },

  hide() {

    if (this.isDestroying) {
      return;
    }

    /* If the tooltip is about to be showed by
    a delay, stop is being shown. */

    run.cancel(this._showTimer);

    this._hideTooltip();
  },

  show() {

    if (this.isDestroying) {
      return;
    }

    const delay = this.delay;
    const duration = this.duration;

    run.cancel(this._showTimer);
    run.cancel(this._completeHideTimer);

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

    run.cancel(this._hideTimer);

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

    if (!this.delayOnChange) {

      /* If the `delayOnChange` property is set to false, we
      don't want to delay opening this tooltip/popover if there is
      already a tooltip/popover shown in the DOM. Check that here
      and adjust the delay as needed. */

      let shownTooltipsOrPopovers = document.querySelectorAll(`.${ANIMATION_CLASS}`);

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
    const _tooltip = this._tooltip;

    if (!_tooltip || this.isDestroying) {
      return;
    }

    if (_tooltip.popperInstance) {
      _tooltip.popperInstance.popper.classList.remove(ANIMATION_CLASS);
    }

    const _completeHideTimer = run.later(() => {

      if (this.isDestroying) {
        return;
      }

      cancelAnimationFrame(this._spacingRequestId);
      _tooltip.hide();

      this.set('_isHiding', false);
      this.set('isShown', false);
      this._dispatchAction('onHide', this);
    }, this._animationDuration);

    this.set('_completeHideTimer', _completeHideTimer);
  },

  _showTooltip() {

    if (this.isDestroying) {
      return;
    }

    const _tooltip = this._tooltip;

    _tooltip.show();

    this.set('isShown', true);

    run(() => {
      if (this.isDestroying) {
        return;
      }

      _tooltip.popperInstance.popper.classList.add(ANIMATION_CLASS);

      this._dispatchAction('onShow', this);
    });
  },

  toggle() {

    /* We don't use toggleProperty because we centralize
    logic for showing and hiding in the show() and hide()
    methods. */

    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  },

  _addEventListener(eventName, callback, element) {
    const target = element || this.target;

    /* Remember event listeners so they can removed on teardown */

    const boundCallback = run.bind(this, callback);

    this._tooltipEvents.push({
      callback: boundCallback,
      target,
      eventName,
    });

    /* Add the event listeners */

    target.addEventListener(eventName, boundCallback);
  },

  _dispatchAction(actionName, ...args) {
    const action = this.get(actionName);

    if (!this.isDestroying && !this.isDestroyed && action) {
      action(...args);
    }
  },

  _cleanupTimers() {
    run.cancel(this._showTimer);
    cancelAnimationFrame(this._spacingRequestId);
  }
});

function mergeModifiers(defaults, overrides = {}) {
  const defaultKeys = Object.keys(defaults);
  const overriddenKeys = Object.keys(overrides);
  const keys = [].concat(defaultKeys, overriddenKeys).reduce((acc, key) => {
    if (acc.indexOf(key) === -1) acc.push(key);
    return acc;
  }, []);
  const modifiers = assign({}, defaults);

  keys.forEach((key) => {
    if (defaultKeys.indexOf(key) !== -1 && overriddenKeys.indexOf(key) !== -1) {
      modifiers[key] = assign(
        {},
        defaults[key],
        overrides[key]
      );
    } else if (overriddenKeys.indexOf(key) !== -1) {
      modifiers[key] = overrides[key];
    }
  });

  return modifiers;
}
