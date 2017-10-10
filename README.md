Ember-tooltips (and popovers) [![Build Status](https://travis-ci.org/sir-dunxalot/ember-tooltips.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-tooltips) [![npm](https://img.shields.io/npm/v/ember-tooltips.svg)](https://www.npmjs.com/package/ember-tooltips) [![Ember Observer Score](http://emberobserver.com/badges/ember-tooltips.svg)](http://emberobserver.com/addons/ember-tooltips)
======

Render tooltips and popovers on components and other HTML elements using HTMLBars.

## Installation

```
ember install ember-tooltips
```

## Documentation

Documentation for usage is below:

- [Demo](http://sir-dunxalot.github.io/ember-tooltips/)
- [Usage](#usage)
  - [ember-tooltip](#ember-tooltip)
  - [ember-popover](#ember-popover)
  - [Targets](#targets)
- [Options](#options)
  - [Setting defaults](#setting-defaults)
- [Actions](#actions)
- [Testing](#testing)
  - [Test helpers](#test-helpers)
- [Accessibility](#accessibility)

## Usage

### Ember Tooltip

The easiest way to add a tooltip to any element is with the `{{ember-tooltip}}` component:

```hbs
{{#my-component}}
  Hover for more info

  {{ember-tooltip text='Here is more info!'}}
{{/my-component}}
```

Or in block form:

```hbs
{{#my-component}}
  Hover for more info

  {{#tooltip}}
    Here is the info in a tooltip!
  {{/ember-tooltip}}
{{/my-component}}
```

The tooltip will always be rendered on its parent element unless you specify the `targetId` attribute:

```hbs
{{input id='has-info-tooltip'}}

{{#ember-tooltip targetId='has-info-tooltip'}}
  Here is some more info
{{/ember-tooltip}}
```

Tooltips and popovers are lazy rendered. That means the are only rendered in the DOM once the user interacts with the [target element](#targets).

Options can be set on the `{{ember-tooltip}}` as attributes:

```hbs
{{#my-component}}
  Click for more info

  {{#ember-tooltip event='click'}}
    This info will show on click!
  {{/ember-tooltip}}
{{/my-component}}
```

Documentation for supported options is located [here](#options).

### Ember popover

Popovers can be created with the `{{ember-popover}}` component, which is added to apps just like `{{ember-tooltip}}`.

Popovers support the same `target` behavior as tooltips; popovers will render on their parent element unless a `targetId` is supplied.

All the [options](#options) passed to tooltip components can be passed to popover components:

```hbs
{{#my-component}}
  Click for more info

  {{#ember-popover event='click'}}
    This info will show in a popover on click!
  {{/ember-popover}}
{{/my-component}}
```

Popovers also benefit from a `hide` API made publically acessible:

```
{{#ember-popover as |popover|}}
  Click <a href {{action 'hide' target=popover}}>here</a> to hide the popover
{{/ember-popover}}
```

In addition, a [popoverHideDelay](#popover-hide-delay) option is made available for popovers only.

## Targets

The concept of a 'target' is used through this addon. A target is the element that the tooltip or popover is attached to. Each tooltip or popvers has its own target. Interacting with this target will render and/or show the tooltip or popover.

For example, if you want to show a tooltip over a button when the user hovers over the button, the button is the target. If you want to show a popover over an input when the user focuses on the input, the input is the target.

## Options

Options are set as attributes on the tooltip/popover components. Current tooltip/popover properties this addon supports are:

- [class](#class)
- [delay](#delay)
- [delayOnChange](#delay-on-change)
- [duration](#duration)
- [effect](#effect)
- [event](#event)
- [hideOn](#hide-on)
- [side](#side)
- [showOn](#show-on)
- [spacing](#spacing)
- [text (tooltip only)](#text)
- [isShown](#is-shown)
- [hideDelay (popover only)](#hide-delay)
- [enableLazyRendering](#enable-lazy-rendering)

#### Class

| Type    | String  |
|---------|---------|
| Default | none    |

Adds a class to any tooltip:

```hbs
{{ember-tooltip class='tooltip-warning'}}
```

#### Delay

| Type    | Number  |
|---------|---------|
| Default | 0       |

Delays showing the tooltip by the given number of milliseconds.

```hbs
{{!--Delays the show animation by 500ms--}}

{{ember-tooltip delay=500}}
```

This does not affect the hiding of the tooltip. See also, [delayOnChange](#delay-on-change).

#### Delay on change

| Type    | Boolean |
|---------|---------|
| Default | true    |

Whether or not to enforce the delay even when the user transitions their cursor between multiple target elements with tooltips.

See this animation for a visual explanation:

![](https://cloud.githubusercontent.com/assets/669410/15400803/d99f671e-1dba-11e6-8183-8b160cbcda10.gif)

```hbs
{{!--Forces delay to be enforced when the user skips
between elements with tooltips--}}

{{ember-tooltip delayOnChange=true}}
```

#### Duration

| Type    | Number  |
|---------|---------|
| Default | 0       |

Sets the duration for which the tooltip will be open, in milliseconds. When the tooltip has been opened for the duration set it will hide itself.

The user will still hide the tooltip if the hide event occurs before the duration expires.

```hbs
{{!-- Closes the tooltip after 1000ms--}}

{{ember-tooltip duration=1000}}
```

Leave as `0` if you wish for the tooltip to remain open indefinitely.

#### Effect

| Type    | String  |
|---------|---------|
| Default | 'slide' |

Sets the animation used to show and hide the tooltip. Possible options are:

- `'fade'`
- `'slide'`
- `'none'`

```hbs
{{ember-tooltip effect='slide'}}
```

#### Event

| Type    | String  |
|---------|---------|
| Default | 'hover' |

The event that the tooltip will hide and show for. Possible options are:

- `'hover'`
- `'click'`
- `'focus'` (hides on blur)
- `'none'`

```hbs
{{ember-tooltip event='click'}}
```

This event is overwritten by the individual [`hideOn`](#hide-on) and [`showOn`](#show-on) properties. In effect, setting `event` sets `hideOn` and `shownOn` for you.

The tooltip can also be shown programatically by passing in the `isShown` property, [documented here](#is-shown).

#### Hide on

| Type    | String  |
|---------|---------|
| Default | 'none'  |

Sets the event that the tooltip will hide on. This overwrites any event set with the [event](#event) option.

This can be any javascript-emitted event.

```hbs
{{!--This tooltip will hide on mouseleave, NOT click--}}

{{ember-tooltip
  event='click'
  hideOn='mouseleave'
}}
```

Usually, you'll use the `event` option, which sets `showOn` and `hideOn` automatically, instead of this option.

This opeion does not affect the event the tooltip shows on. That is set by the [showOn](#show-on) option. This will override [the event property](#event) in deciding when the tooltip is hidden.

#### Side

| Type    | String  |
|---------|---------|
| Default | 'top'   |

Sets the side the tooltip will render on. If `keepInWindow` is set to `true`, `side` can be overwritten to keep the tooltip on screen.

Possible options are:

- `'top'`
- `'right'`
- `'bottom'`
- `'left'`

```hbs
{{!--The tooltip will render on the right of the target element--}}

{{ember-tooltip
  side='right'
}}
```

#### Show on

| Type    | String  |
|---------|---------|
| Default | 'none'  |

Sets the event that the tooltip will show on. This overwrites any event set with the [event](#event) option.

This can be any javascript-emitted event.

```hbs
{{!--This tooltip will show on click, NOT hover--}}

{{ember-tooltip
  showOn='click'
}}
```

Usually, you'll use the `event` option, which sets `showOn` and `hideOn` automatically, instead of this option.

This opeion does not affect the event the tooltip hides on. That is set by the [hideOn](#hide-on) option. This will override [the event property](#event) in deciding when the tooltip is shown.

#### Spacing

| Type    | Number  |
|---------|---------|
| Default | 10      |

Sets the number of pixels the tooltip will render from the target element. A higher number will move the tooltip further from the target. This can be any number.

```hbs
{{!--Render the tooltip 20px from the target element--}}
{{ember-tooltip spacing=20}}
```

#### Text

| Type    | String  |
|---------|---------|
| Default | null    |

Sets the text of any tooltip without needing the tooltip to be written in block form.

```hbs
{{#my-component}}
  Hover for more info

  {{ember-tooltip text='Here is more info!'}}
{{/my-component}}
```

#### Is Shown

| Type    | Boolean |
|---------|---------|
| Default | false   |

Gives you a programatic way to hide and show a tooltip. Set this value to `true` to manually show the tooltip.

This can be useful alongside `event='none'` when you only want to toolip to show when you specific and not based on an user action.

```hbs
{{!--Binds the tooltip visibility to the showTooltip property--}}
{{ember-tooltip isShown=true event='none'}}
```

#### Hide delay

| Type    | Number |
|---------|---------|
| Default | 250   |

**POPOVER ONLY:** The number of milliseconds before the popover will hide after the user hovers away from the popover and the popover target. This is only applicable when `event='hover'`.

```hbs
{{ember-popover event='hover' hideDelay=300}}
```

![popover-hover](https://cloud.githubusercontent.com/assets/7050871/18113238/e010ee64-6ee2-11e6-9ff1-a0c674a6d702.gif)

### Setting Defaults

You can set the default for any option by extending the `{{ember-tooltip}}` or `{{ember-popover}}` component:

```js
{{!--your-app/components/ember-tooltip}}--}}

import EmberTooltipComponent from 'ember-tooltips/components/ember-tooltip';

export default EmberTooltipComponent.extend({
  effect: 'fade',
  side: 'bottom',
});
```

## Actions

Four actions are available for you to hook onto through the tooltip/popover lifecycle:

```hbs
{{ember-tooltip
  onDestroy='onDestroy'
  onHide='onHide'
  onRender='onRender'
  onShow='onShow'
}}
```

## Testing

### Test helpers

This addon exposes testing helpers which can be used inside of the consuming app's acceptance and integration tests. We use a tooltip-centric naming convention but these can also be used to test popovers.

Publically available test helpers are:

- [assertTooltipContent()](#asserttooltipcontent)
- [assertTooltipRendered()](#asserttooltiprendered)
- [assertTooltipNotRendered()](#asserttooltipnotrendered)
- [assertTooltipVisible()](#asserttooltipvisible)
- [assertTooltipNotVisible()](#asserttooltipnotvisible)
- [assertTooltipSide()](#asserttooltipside)
- [assertTooltipSpacing()](#asserttooltipspacing)
- [triggerTooltipTargetEvent()](#triggertooltiptargetevent)

All assert helpers require `assert` to be passed as the first param and some accept a second, optional param for additional test options. For detailed usage instructions and examples, see the documentation for each test helper below.

All test helpers can be imported from the following path:

```js
'appname/tests/helpers/ember-tooltips';
```

For example:

```js
// appname/tests/integration/components/some-component.js

import {
  assertTooltipRendered,
} from 'appname/tests/helpers/ember-tooltips';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('some-component', 'Integration | Component | Some', {
  integration: true,
});

test('ember-tooltip animates with a delay', function(assert) {

  // ... Test content...

  assertTooltipRendered(assert);

  // ... More test content...

});
```

#### assertTooltipContent()

Asserts that a tooltip or popover has content that matches a given string.

```js
import {
  afterTooltipRenderChange,
  assertTooltipContent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip text='More info' isShown='true'}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipContent(assert, {
      contentString: 'More info',
    });
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`contentString`](#test-helper-option-contentstring) - REQUIRED
- [`selector`](#test-helper-option-selector)

#### assertTooltipRendered()

Asserts that a tooltip or popover has been rendered in the DOM.

```js
import {
  afterTooltipRenderChange,
  assertTooltipRendered,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip}}`);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {
    assertTooltipRendered(assert);
  });
});
```

Please note, `assertTooltipRendered()` does not assert that the tooltip or popover is visible to the user - use [assertTooltipVisible()](#asserttooltipvisible) for that.

Given this addon's lazy rendering capabilities (explained in [Targets](#targets)), tooltips will not be rendered until the target is interacted with. As such, this helper is often used in conjunction with [triggerTooltipTargetEvent()](#triggertooltiptargetevent) or `isShown='true'` to test a tooltip property after the tooltip is rendered.

For example:

```js
import {
  afterTooltipRenderChange,
  assertTooltipRendered,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip text='Hello'}}
  `);

  /* Tooltip won't be rendered in the DOM yet because lazy rendering delays the rendering until the user interacts with the target */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Now the user has interacted with the target, so the tooltip should be rendered... */

  afterTooltipRenderChange(assert, () => {
    assertTooltipRendered(assert);
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipNotRendered()

Asserts that a tooltip or popover has not been rendered in the DOM.

Why is this test helper useful? Well, given this addon's lazy rendering capabilities (explained in [Targets](#targets)), tooltips may not be rendered until the target is interacted with.

```js
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipRendered,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), 'mouseenter');

    afterTooltipRenderChange(assert, () => {
      assertTooltipRendered(assert);
    });
  });
});
```

This helper does not assert that the tooltip or popover is not visible to the user. The assertion will fail if the tooltip or popover is not visible to the user but is still rendered in the DOM. If you want to assert that a tooltip or popover is not visible once it's rendered in the DOM, use [assertTooltipNotVisible()](#asserttooltipnotvisible).

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipVisible()

Asserts that a tooltip or popover is visible.

This helper is usually used in conjunction with [triggerTooltipTargetEvent()](#triggertooltiptargetevent) to assert that a particular user interaction shows a tooltip to the user.

For example:

```js
import {
  afterTooltipRenderChange,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip}}`);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Asserts that the tooltip is shown when the user hovers over the target, which is this test's element */

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);
  });
});
```

You may use this helper with a variety of different user interactions. Here's an example that asserts that a tooltip is shown when the user focusses on an input:

```js
import {
  afterTooltipRenderChange,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    <input id="url-input">
    {{ember-tooltip targetId='url-input'}}
  `);

  triggerTooltipTargetEvent($('#url-input'), 'focus');

  /* Asserts that the tooltip is made visible when the user focuses on the input */

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);
  });
});
```

This does not assert that the tooltip or popover is rendered in the DOM (regardless of visibility to the user) - use [assertTooltipRendered()](#asserttooltiprendered) for that.

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipNotVisible()

Asserts that a tooltip or popover is not visible.

This helper is usually used in conjunction with [triggerTooltipTargetEvent()](#triggertooltiptargetevent) to assert that a particular user interaction hides a tooltip to the user.

For example:

```js
import {
  afterTooltipRenderChange,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip}}`);

  /* Hover over the target to show the tooltip... */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    /* Stop hovering over the target in order to hide the tooltip... */

    triggerTooltipTargetEvent(this.$(), 'mouseleave');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    });
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipSide()

Asserts that a tooltip or popover is rendered on the correct side of [the target](#targets).

This helper tests [the side option](#side) that can be passed to tooltips and popovers.

An options hash is required and it must contain a `side` property. For example:

```js
import {
  afterTooltipRenderChange,
  assertTooltipSide,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip side='right' isShown=true}}
  `);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, {
      side: 'right', // SIDE IS REQUIRED
    });
  });

});
```

The [options hash](#test-helper-options) accepts:

- [`side`](#test-helper-option-side) - REQUIRED
- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipSpacing()

Asserts that a tooltip or popover is rendered a given number of pixels from [the target](#targets).

This helper tests [the spacing option](#spacing) that can be passed to tooltips and popovers.

An options hash is required and it must contain `spacing` and `side` properties. For example:

```js
import {
  afterTooltipRenderChange,
  assertTooltipSpacing,
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip spacing=35 isShown=true}}
  `);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, {
      side: 'right', // SIDE IS REQUIRED
      spacing: 35, // SPACING IS REQUIRED
    });
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`side`](#test-helper-option-side) - REQUIRED
- [`selector`](#test-helper-option-selector)
- [`spacing`](#test-helper-option-spacing) - REQUIRED
- [`targetSelector`](#test-helper-option-targetselector)

#### triggerTooltipTargetEvent()

Triggers an event on a tooltip or popover's [target](#targets).

This helper does not require `assert` to be passed. Instead, it requires a jQuery element and event name:

```js
import {
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip}}`);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

});
```

Other events can be passed for more complex interactions:

```js
import {
  triggerTooltipTargetEvent,
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{input id='has-info-tooltip'}}

    {{#ember-tooltip targetId='has-info-tooltip' event='focus'}}
      Here is some more info
    {{/ember-tooltip}}
  `);

  triggerTooltipTargetEvent($('#has-info-tooltip'), 'focus');

  /* Then we'd do something like assert that the tooltip has been rendered... */

});
```

Allowed event names are:

- `'mouseenter'`
- `'mouseleave'`
- `'click'`
- `'focus'`
- `'focusin'`
- `'blur'`

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

### Test helper options

Most test helpers accept a second, optional param called `options`. This is an object you can pass that customizes various options in a test. The properties you can pass via `options` for each test helper is listed above. Below you will find more information for each property.

- [Content string](#test-helper-option-contentstring)
- [Selector](#test-helper-option-selector)
- [Target selector](#test-helper-option-targetselector)
- [Side](#test-helper-option-side)
- [Spacing](#test-helper-option-spacing)
- [Event](#test-helper-option-event)

#### Test helper option: `contentString`

The content string you expect the tooltip or popover to have.

| Type    | String |
|---------|---------|
| Default | null |

Usage example:

```js
import { assertTooltipRendered } from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`{{ember-tooltip test='More info'}}`);

  assertTooltipContent(assert, {
    contentString: 'More info',
  });

});
```

#### Test helper option: `selector`

The selector of the tooltip or popover you are testing.

If more than one tooltip or popover is found in the DOM when you run an assertion, you will be asked to specify this.

| Type    | String |
|---------|---------|
| Default | `'.ember-tooltip, .ember-popover'` |

Usage example:

```js
import { assertTooltipRendered } from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip class='test-tooltip'}}
    {{ember-tooltip}}
  `);

  assertTooltipRendered(assert, {
    selector: '.test-tooltip',
  });
});
```

#### Test helper option: `targetSelector`

The selector of the tooltip or popover target you are testing. See [Targets](#targets) for an explanation on what a 'target' is.

If more than one tooltip or popover target is found in the DOM when you run an assertion, you will be asked to specify this.

| Type    | String |
|---------|---------|
| Default | `'.ember-tooltip-or-popover-target'` |

Usage example:

```js
import { assertTooltipSpacing } from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    <div class="test-target">
      {{ember-tooltip}}
    </div>

    <div>
      {{ember-tooltip}}
    </div>
  `);

  assertTooltipSpacing(assert, {
    targetSelector: '.test-target',
  });
});
```

#### Test helper option: `side`

The value for the tooltip or popover's [`side` option](#side) that you are asserting.

| Type    | String |
|---------|---------|
| Default | `null |

For example, if you specify for the tooltip or popover be shown on the right of the target using `side='right'`, you will pass `side: 'right'` in assertions that test side. Here is the code for this example:

```js
import { assertTooltipSide } from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip side='right'}}
  `);

  assertTooltipSide(assert, {
    side: 'right',
  });
});
```

#### Test helper option: `spacing`

The value for the tooltip or popover's [`spacing` option](#spacing) that you are asserting. Specify as a number of pixels expected (without a `px` unit).

| Type    | Number |
|---------|---------|
| Default | `null` |

For example, if you specify for the tooltip or popover be shown on the right of the target using `side='right'`, you will pass `side: 'right'` in assertions that test side. Here is the code for this example:

```js
import { assertTooltipSide } from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip spacing='35'}}
  `);

  assertTooltipSpacing(assert, {
    spacing: 35,
  });
});
```

#### Test helper option: `event`

The name of the event that you would like to trigger on an element.

| Type    | String |
|---------|---------|
| Default | `null` |

Usually used to specify an event for showing/hiding tooltips and popovers:

```js
import {
  triggerTooltipTargetEvent
} from 'appname/tests/helpers/ember-tooltips';

test('Example test', function(assert) {

  this.render(hbs`
    {{ember-tooltip event='click'}}
  `);

  triggerTooltipTargetEvent(assert, {
    event: 'click',
  });

  /* Now the tooltip should be visible! */

});
```

## Accessibility

This addon aims to meet 508 compliance.

Elements with tooltips are given a `tabindex` attribute and when the element receives focus, the tooltip with show.

Additionally, the `aria-describedby`, `title`, `id`, and `role` attributes are managed by this addon.

There is always room for improvement and PRs to improve accessibility are welcome.

## Development

All PRs and issues are welcome.

- `git clone https://github.com/sir-dunxalot/ember-tooltips.git`
- `cd ember-tooltips`
- `npm install && bower install`
- `ember s`
- `ember test`, `ember try:testall`, or the `/tests` route

Please include tests and documentation updates with any new features.

You do not need to bump the version when you have a PR.

To release an update to the demo app:

```sh
git checkout master # make sure you're on master branch
ember github-pages:commit --message "Some commit message" # Builds the app
git push origin gh-pages:gh-pages # Deploys the app
```
