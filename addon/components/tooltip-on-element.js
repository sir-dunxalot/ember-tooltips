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
  tooltipIsVisible: false,
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

  'aria-hidden': computed.not('tooltipIsVisible'),
  attributeBindings: ['aria-hidden', 'role', 'tabindex'],
  classNameBindings: ['effectClass'],
  classPrefix: 'ember-tooltip',
  classNames: ['ember-tooltip', 'tooltip'],
  /* The "tooltip" class is only included for backwards compatibility and
  will be removed in an upcoming major release. The component receives
  all of its styling and behavior from the "ember-tooltip" class. */

  _hideTimer: null,
  _showTimer: null,

  /* CPs */

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
    return `ember-tooltip-${this.get('effect')}`;
  }),

  positionClass: computed(function() {
    const targetAttachment = this.get('targetAttachment');

    return `ember-tooltip-${targetAttachment.replace(' ', ' ember-tooltip-')}`;
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

    return type ? `ember-tooltip-${type}` : null;
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

    this.set('tooltipIsVisible', false);
    this.sendAction('onTooltipHide', this);
  },

  didInsertElement() {
    this._super(...arguments);

    const target = this.get('target');

    if (!target || target.indexOf('#') === -1) {
      Ember.assert('You must specify a target attribute in the format target="#element-id" for the tooltip component');
    }

    const event = this.get('event');
    const $target = $(this.get('target'));
    const _tether = this.get('_tether');
    const $_tether = $(_tether.element);

    this.sendAction('onTooltipRender', this);

    /* Setup event handling to hide and show the tooltip */

    if (event !== 'none') {
      const _hideOn = this.get('_hideOn');
      const _showOn = this.get('_showOn');

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
            this.show();
          });
        }

        if (_hideOn !== 'none') {
          $target.on(_hideOn, () => {
            this.hide();
          });
        }
      }

      /* Hide and show the tooltip on focus and escape
      for acessibility */

      if (event !== 'focus') {

        /* If the event is click, we don't want the
        click to also trigger focusin */

        if (event !== 'click') {
          $target.focusin(() => {
            this.show();
          });
        }

        $target.focusout(() => {
          this.hide();
        });
      }

      $target.keydown((keyEvent) => {
        if (keyEvent.which === 27) {
          this.hide();
          keyEvent.preventDefault();

          return false;
        }
      });
    }

    $target.attr({
      'aria-describedby': `#${this.get('elementId')}`,
      tabindex: $target.attr('tabindex') || this.get('tabindex'),
    });

    /* When this component has rendered we need
    to check if Tether moved its position to keep the
    element in bounds */

    let renderedSide;

    ['top', 'right', 'bottom', 'left'].forEach(function(side) {
      if ($_tether.hasClass(`ember-tooltip-target-attached-${side}`)) {
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
    }, 1000);
  },

  /*
  We use an observer so the user can set tooltipIsVisible
  as a attribute.

  @method setTimer
  */

  setTimer: Ember.observer('tooltipIsVisible', function() {
    const tooltipIsVisible = this.get('tooltipIsVisible');

    if (tooltipIsVisible) {
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

    if (this.get('isDestroying')) {
      return;
    }

    const _showTimer = this.get('_showTimer');

    let delay = cleanNumber(this.get('delay'));

    run.cancel(_showTimer);

    if (delay) {
      if (!this.get('delayOnChange')) {

        /* If the `delayOnChange` property is set to false, we
        don't want to delay opening this tooltip if there is
        already a tooltip visible in the DOM. Check that here
        and adjust the delay as needed. */

        let visibleTooltips = Ember.$('.ember-tooltip[aria-hidden="false"]').length;

        if (visibleTooltips) {
          delay = 0;
        }
      }

      const _showTimer = run.later(this, this.set, 'tooltipIsVisible', true, delay);

      this.set('_showTimer', _showTimer);
    } else {

      /* If there is no delay, show the tooltop immediately */

      this.set('tooltipIsVisible', true);
    }

    this.sendAction('onTooltipShow', this);
  },

  toggle() {

    /* We don't use toggleProperty because we centralize
    logic for showing and hiding in the show() and hide()
    methods. */

    if (this.get('tooltipIsVisible')) {
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
