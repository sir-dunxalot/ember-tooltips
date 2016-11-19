import Ember from 'ember';


const getTooltipFromBody = function($body, selector='.ember-tooltip, .ember-popover', oneTooltipMustExist=true) {
  // we have to .find() tooltips from $body because sometimes
  // tooltips and popovers are rendered as children of <body>

  if ($body.prop('tagName') !== 'BODY') {
    throw Error('the first parameter must be $body');
  }

  let $tooltip = $body.find(selector) ;

  if (oneTooltipMustExist) {
    if (!$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
      throw Error(`getTooltipFromBody(): no $(${selector}) in $body found`);
    } else if ($tooltip.length > 1) {
      throw Error('getTooltipFromBody(): Multiple tooltips where found. Please provide an {option.selector = ".specific-tooltip-class"}')
    }
  }

  return $tooltip;
}

export function triggerTooltipEvent($element, type, options={}) {

  // TODO why do we allow focusin? why not just focus?
  const approvedEventTypes = ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur'];
  if (approvedEventTypes.indexOf(type) == -1) {
    throw Error(`only approvedEventTypes will affect the tooltip target. You used ${type}`);
  }

  let wasEventTriggered = false;

  if (options.selector) {
    $element = $element.find(options.selector);
  }

  // we need to need to wrap any code with asynchronous side-effects in a run
  // $tooltipTarget.trigger('someEvent') has asynchronous side-effects
  Ember.run(() => {
    // if the $tooltip is hidden then the user can't interact with it
    if ($element.attr('aria-hidden') === 'true') {
      return;
    }
    if (type === 'focus' || type === 'blur') {
      // we don't know why but this is necessary when type is 'focus' or 'blur'
      $element[0].dispatchEvent(new window.Event(type));
    } else {
      $element.trigger(type);
    }

    wasEventTriggered = true;
  });

  return wasEventTriggered;
}

export function assertTooltipNotRendered($body, assert, options={}) {
  const $tooltip = getTooltipFromBody($body, options.selector, false);

  assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
}

export function assertTooltipRendered($body, assert, options={}) {
  const $tooltip = getTooltipFromBody($body, options.selector);

  assert.equal($tooltip.length, 1, 'assertTooltipRendered(): the ember-tooltip should be rendered');
}

export function assertTooltipNotVisible($body, assert, options={}) {
  const $tooltip = getTooltipFromBody($body, options.selector);
  const isTooltipInvisible = $tooltip.attr('aria-hidden') == 'true';
  const isTooltipTetherDisabled = $tooltip.attr('data-tether-enabled') == 'false';

  assert.ok(isTooltipInvisible && isTooltipTetherDisabled,
      `assertTooltipNotVisible(): the ember-tooltip should invisible and the tether should be disabled:
        isTooltipInvisible -> ${isTooltipInvisible} ;
        isTooltipTetherDisabled -> ${isTooltipTetherDisabled}`);
}

export function assertTooltipVisible($body, assert, options={}) {
  const $tooltip = getTooltipFromBody($body, options.selector);
  const isTooltipVisible = $tooltip.attr('aria-hidden') == 'false';
  const isTooltipTetherEnabled = $tooltip.attr('data-tether-enabled') == 'true';

  assert.ok(isTooltipVisible && isTooltipTetherEnabled,
      `assertTooltipVisible(): the ember-tooltip should be visible and the tether should be enabled:
        isTooltipVisible -> ${isTooltipVisible} ;
        isTooltipTetherEnabled -> ${isTooltipTetherEnabled}`);
}
