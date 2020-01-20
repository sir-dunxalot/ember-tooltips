Ember-tooltips (and popovers) [![Build Status](https://travis-ci.org/sir-dunxalot/ember-tooltips.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-tooltips) [![npm](https://img.shields.io/npm/v/ember-tooltips.svg)](https://www.npmjs.com/package/ember-tooltips) [![Ember Observer Score](http://emberobserver.com/badges/ember-tooltips.svg)](http://emberobserver.com/addons/ember-tooltips)
======

Render tooltips and popovers on components and other HTML elements using HTMLBars.

## Installation

```sh
ember install ember-tooltips
```

## Upgrading from 2.x

See [UPGRADING-3.x.md](UPGRADING-3.x.md)

## Documentation

Documentation for usage is below:

- [Demo](http://sir-dunxalot.github.io/ember-tooltips/)
- [Usage](#usage)
  - [ember-tooltip](#ember-tooltip)
  - [ember-popover](#ember-popover)
- [Options](#options)
  - [Setting defaults](#setting-defaults)
- [Actions](#actions)
- [Testing](#testing)
  - [Test helpers](#test-helpers)
    - [Importing test helpers](#importing-test-helpers)
- [Accessibility](#accessibility)
- [Development](#development)

## Usage

This documentation is for the `3.x` version of ember-tooltips. For `2.x` documentation, please refer to the [2.x branch README](https://github.com/sir-dunxalot/ember-tooltips/tree/2.x).

_Note_: The documentation below is up-to-date for Ember Octane Edition
conventions. However, it is still valid to use earlier curly-bracket syntax too,
e.g. `{{ember-tooltip text="Hello!" onShow=(action 'someAction')}}`

### Ember Tooltip

The easiest way to add a tooltip to any element is with the `<EmberTooltip />` component:

```hbs
<MyComponent>
  Hover for more info

  <EmberTooltip @text="Here is more info!" />
</MyComponent>
```

Or in block form:

```hbs
<MyComponent>
  Hover for more info

  <EmberTooltip>
    Here is the info in a tooltip!
  </EmberTooltip>
</MyComponent>
```

The tooltip will always be rendered on its parent element unless you specify the `targetId` attribute:

```hbs
<input id="has-info-tooltip" value="" placeholder="Enter first name..." />

<EmberTooltip @targetId="has-info-tooltip">
  Here is some more info
</EmberTooltip>
```

Tooltips and popovers are lazy rendered. That means the are only rendered in the DOM once the user interacts with the [target element](#targetid).

Options can be set on the `<EmberTooltip>` as attributes:

```hbs
<MyComponent>
  Click for more info

  <EmberTooltip @event="click">
    This info will show on click!
  </EmberTooltip>
</MyComponent>
```

Documentation for supported options is located [here](#options).

### Ember popover

Popovers can be created with the `<EmberPopover />` component, which is added to apps just like `<EmberTooltip />`.

Popovers support the same target behavior as tooltips; popovers will render on their parent element unless a `targetId` is supplied.

All the [options](#options) passed to tooltip components can be passed to popover components:

```hbs
<MyComponent>
  Click for more info

  <EmberPopover @event="click">
    This info will show in a popover on click!
  </EmberPopover>
</MyComponent>
```

Popovers also benefit from a `hide` API made publically acessible:

```hbs
<EmberPopover as |popover|>
  <button onClick={{action "hide" target=popover}} type="button">Click here</button> to hide the popover
</EmberPopover>
```

In addition, a [popoverHideDelay](#popoverhidedelay) option is made available for popovers only.

## Options

Options are set as attributes on the tooltip/popover components. Current tooltip/popover properties this addon supports are:

- [animationDuration](#animationduration)
- [arrowClass](#arrowclass)
- [class](#class)
- [delay](#delay)
- [delayOnChange](#delayonchange)
- [duration](#duration)
- [effect](#effect)
- [event](#event)
- [hideOn](#hideon)
- [isShown](#isshown)
- [popoverHideDelay (popover only)](#popoverhidedelay)
- [popperContainer](#poppercontainer)
- [popperOptions](#popperoptions)
- [side](#side)
- [showOn](#showon)
- [spacing](#spacing)
- [targetId](#targetid)
- [text](#text)
- [tooltipClass](#tooltipclass)

#### `animationDuration`

| Type   | Default |
|--------|---------|
| Number | 200     |

Defines the duration of tooltip animation in milliseconds. In testing, animation duration is always 0.

```hbs
<EmberTooltip @animationDuration={{0}} />
```

#### `arrowClass`

| Type    | Default         |
|---------|-----------------|
| String  | 'tooltip-arrow' |

Adds extra classes to tooltip arrows.

Usually used along with [`tooltipClass`](#tooltipclass).

```hbs
<EmberTooltip @arrowClass="hoverhelp__arrow" />
```

This will create html similar to:
```html
<div class="tooltip">
  <div class="hoverhelp__arrow"></div>
  <div class="tooltip-inner"><!-- content --></div>
</div>
```

#### `class`

| Type   | Default |
|--------|---------|
| String | none    |

Adds a class to any tooltip wrapper:

```hbs
<EmberTooltip class="tooltip-wrapper" />
```
**Note:** This is usually not what you want, as the wrapper itself is hidden by default.
You are probably looking for [`tooltipClass`](#tooltipclass).

#### `delay`

| Type    | Default |
|---------|---------|
| Number  | 0       |

Delays showing the tooltip by the given number of milliseconds.

```hbs
{{!--Delays the show animation by 500ms--}}

<EmberTooltip @delay={{500}} />
```

This does not affect the hiding of the tooltip. See also, [delayOnChange](#delayonchange).

#### `delayOnChange`

| Type    | Default |
|---------|---------|
| Boolean | true    |

Whether or not to enforce the delay even when the user transitions their cursor between multiple target elements with tooltips.

See this animation for a visual explanation:

![](https://cloud.githubusercontent.com/assets/669410/15400803/d99f671e-1dba-11e6-8183-8b160cbcda10.gif)

```hbs
{{!--Forces delay to be enforced when the user skips
between elements with tooltips--}}

<EmberTooltip @delayOnChange={{true}} />
```

#### `duration`

| Type    | Default |
|---------|---------|
| Number  | 0       |

Sets the duration for which the tooltip will be open, in milliseconds. When the tooltip has been opened for the duration set it will hide itself.

The user will still hide the tooltip if the hide event occurs before the duration expires.

```hbs
{{!-- Closes the tooltip after 1000ms--}}

<EmberTooltip @duration={{1000}} />
```

Leave as `0` if you wish for the tooltip to remain open indefinitely.

#### `effect`

| Type    | Default |
|---------|---------|
| String  | 'slide' |

Sets the animation used to show and hide the tooltip. Possible options are:

- `'fade'`
- `'slide'`
- `'none'`

```hbs
<EmberTooltip @effect="slide" />
```

#### `event`

| Type    | Default |
|---------|---------|
| String  | 'hover' |

The event that the tooltip will hide and show for. Possible options are:

- `'hover'`
- `'click'`
- `'focus'` (hides on blur)
- `'none'`

```hbs
<EmberTooltip @event="click" />
```

This event is overwritten by the individual [`hideOn`](#hideon) and [`showOn`](#showon) properties. In effect, setting `event` sets `hideOn` and `shownOn` for you.

The tooltip can also be shown programatically by passing in the `isShown` property, [documented here](#isshown).

#### `hideOn`

| Type    | Default |
|---------|---------|
| String  | 'none'  |

Sets the event that the tooltip will hide on. This overwrites any event set with the [event](#event) option.

This can be any javascript-emitted event.

```hbs
{{!--This tooltip will hide on mouseleave, NOT click--}}

<EmberTooltip
  @event="click"
  @hideOn="mouseleave"
/>
```

Usually, you'll use the `event` option, which sets `showOn` and `hideOn` automatically, instead of this option.

This option does not affect the event the tooltip shows on. That is set by the [showOn](#showon) option. This will override [the event property](#event) in deciding when the tooltip is hidden.

#### `innerClass`

| Type    | Default         |
|---------|-----------------|
| String  | 'tooltip-inner' |

Adds extra classes to inner tooltips.

Usually used along with [`tooltipClass`](#tooltipclass).

```hbs
<EmberTooltip @innerClass="hoverhelp__inner" />
```

This will create html similar to:
```html
<div class="tooltip">
  <div class="tooltip-arrow"></div>
  <div class="hoverhelp__inner"><!-- content --></div>
</div>
```

#### `isShown`

| Type    | Default |
|---------|---------|
| Boolean | false   |

Gives you a programatic way to hide and show a tooltip. Set this value to `true` to manually show the tooltip.

This can be useful alongside `event='none'` when you only want to toolip to show when you specific and not based on an user action.

```hbs
{{!--Binds the tooltip visibility to the showTooltip property--}}
<EmberTooltip @isShown={{this.showTooltip}} @event="none" />
```

#### `popoverHideDelay`

| Type    | Default  |
|---------|----------|
| Number  | 250      |

**POPOVER ONLY:** The number of milliseconds before the popover will hide after the user hovers away from the popover and the popover target. This is only applicable when `event='hover'`.

```hbs
<EmberPopover @event="hover" @popoverHideDelay={{300}} />
```

![popover-hover](https://cloud.githubusercontent.com/assets/7050871/18113238/e010ee64-6ee2-11e6-9ff1-a0c674a6d702.gif)

#### `popperContainer`

| Type | Default |
|------|---------|
| `HTMLElement` \| `String` \| `false` | false |

Appends the tooltip to a specific element.  By default, the tooltip will be rendered as a sibling of its target. This attribute can be set to render the tooltip elsewhere in the DOM.  See the [tooltip.js container option](https://popper.js.org/tooltip-documentation.html#new_Tooltip_new).

```hbs
{{!--Renders the tooltip as a child of the body element--}}

<EmberTooltip @popperContainer="body" />
```

#### `popperOptions`

| Type    | Default  |
|---------|----------|
| Object  | null     |

Sets the `popperOptions` on the underlying `tooltip.js` instance. Currently, only
overriding `modifiers` is supported. See popper.js documentation for
[more information on available modifiers](https://popper.js.org/popper-documentation.html#modifiers).

This can be used to customize various aspects of tooltip rendering and override
certain `popper.js` defaults set by `ember-tooltips`. For example, using a tooltip
inside of an absolutely or relatively positioned container with overflow constraints,
you may want to disable `preventOverflow.escapeWithReference`.

```js
/* app/components/some-component.js */
import Component from '@ember/component';

export default Component.extend({
  popperOptions: {
    modifiers: {
      preventOverflow: {
        escapeWithReference: false
      }
    }
  },
  /* ... other stuff */
});
```

```hbs
{{!-- app/templates/components/some-component.hbs` --}}

<div class="my-scrollable-container">
  {{#each items as |item|}}
    <div class="row">
      {{item.text}}
      <EmberTooltip @text={{item.tooltip}} @popperOptions={{this.popperOptions}} />
    </div>
  {{/each}}
</div>
```

Note that `popperOptions` is only applied during tooltip creation and that it is
not reapplied if the value changes after the tooltip is rendered.

#### `side`

| Type    | Default |
|---------|---------|
| String  | 'top'   |

Sets the side the tooltip will render on.

Possible options are:

- `'top'`
- `'right'`
- `'bottom'`
- `'left'`

In addition, you may also specify `-start` and `-end` variants [supported by Popper.js](https://popper.js.org/popper-documentation.html#Popper.placements).
e.g. `top-start` to position the tooltip from the top-left or `right-end` to
position from the bottom right.

```hbs
{{!--The tooltip will render on the right of the target element--}}

<EmberTooltip @side="right" />
```

#### `showOn`

| Type    | Default |
|---------|---------|
| String  | 'none'  |

Sets the event that the tooltip will show on. This overwrites any event set with the [event](#event) option.

This can be any javascript-emitted event.

```hbs
{{!--This tooltip will show on click, NOT hover--}}

<EmberTooltip @showOn="click" />
```

Usually, you'll use the `event` option, which sets `showOn` and `hideOn` automatically, instead of this option.

This option does not affect the event the tooltip hides on. That is set by the [hideOn](#hide
on) option. This will override [the event property](#event) in deciding when the tooltip is shown.

#### `spacing`

| Type    | Default |
|---------|---------|
| Number  | 10      |

Sets the number of pixels the tooltip will render from the target element. A higher number will move the tooltip further from the target. This can be any number.

```hbs
{{!--Render the tooltip 20px from the target element--}}
<EmberTooltip @spacing={{20}} />
```

#### `targetId`

| Type   | Default                              |
|--------|--------------------------------------|
| String | null (parent element of the tooltip) |

The concept of a 'target' is used through this addon. A target is the element that the tooltip or popover is attached to. Each tooltip or popvers has its own target. Interacting with this target will render and/or show the tooltip or popover. By default, the tooltip's target is the parent element.
However, with `targetId`, you can specify another element's ID to attach the tooltip to another
element on the page.

For example, if you want to show a tooltip over a button when the user hovers over the button, the button is the target. If you want to show a popover over an input when the user focuses on the input, the input is the target.

```hbs
<input id="has-info-tooltip" value="" placeholder="Enter first name..." />

<EmberTooltip @targetId="has-info-tooltip">
  Here is some more info
</EmberTooltip>
```

#### `text`

| Type    | Default |
|---------|---------|
| String  | null    |

Sets the text of any tooltip without needing the tooltip to be written in block form.

```hbs
<MyComponent>
  Hover for more info

  <EmberTooltip @text="Here is more info!" />
</MyComponent>
```

#### `tooltipClass`

| Type    | Default         |
|---------|-----------------|
| String  | 'tooltip'       |

Adds extra classes to tooltips.

Useful to avoid conflicts with other libraries.

```hbs
<EmberTooltip @tooltipClass="hoverhelp" />
```

This will create html similar to:
```html
<div class="hoverhelp">
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner"><!-- content --></div>
</div>
```

### Setting Defaults

You can set the default for any option by extending the `<EmberTooltip />` or `<EmberPopover />` component:

```js
/* your-app/components/ember-tooltip.js */

import EmberTooltipComponent from 'ember-tooltips/components/ember-tooltip';

export default EmberTooltipComponent.extend({
  effect: 'fade',
  side: 'bottom',
});
```

**Note**: Do not provide a template `hbs` file, when overriding/extending
`ember-tooltips` or `ember-popover`, as this will override the template provided
by the addon and prevent tooltip or popover content from appearing.

## Actions

Four actions are available for you to hook onto through the tooltip/popover lifecycle:

```hbs
<EmberTooltip
  @onDestroy={{action 'onDestroy'}}
  @onHide={{action 'onHide'}}
  @onRender={{action 'onRender'}}
  @onShow={{action 'onShow'}}
/>
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

All assert helpers require `assert` to be passed as the first param and some accept a second, optional param for additional test options.
All assert helpers work with both QUnit's `assert` and chai's `assert`.

For detailed usage instructions and examples, see the documentation for each test helper below.

There are currently two supported flavors of test helpers: one implementation
uses jQuery and one uses the browser's DOM APIs (`querySelector`, etc.). The two
share the same APIs, with exception for the types of selectors they support.

The jQuery assertion test helpers support jQuery-specific pseudoselectors like
`:contains`. However, as jQuery is now optional in Ember 3.4+ and the use-cases
for jQuery-specific selectors and the use of the library are small, these
helpers will likely be removed in the next major release of `ember-tooltips`.

All test helpers live under the following modules:

```js
// (Recommended) Auto-selection of either jQuery or DOM-based APIs, based
// on @ember/optional-features and whether jquery-integration is enabled.
import { assertTooltipContent } from 'ember-tooltips/test-support';

// Explicit path for DOM-based APIs
import { assertTooltipContent } from 'ember-tooltips/test-support/dom';

// Explicit path for jQuery-based APIs (deprecated)
import { assertTooltipContent } from 'ember-tooltips/test-support/jquery';
```

#### Example

```js
/* appname/tests/integration/components/some-component.js */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { assertTooltipRendered } from 'ember-tooltips/test-support';
// Or, on ember-tooltips 3.3.0+ and not using jQuery:
// import { assertTooltipRendered } from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Component | Some component', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders', async function(assert) {

    await render(hbs`<EmberTooltip isShown={{true}} />`);

    assertTooltipRendered(assert);
  });
});
```

#### assertTooltipContent()

Asserts that a tooltip or popover has content that matches a given string.

```js
import { assertTooltipContent } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @text="More info" @isShown={{true}} />`);

  assertTooltipContent(assert, {
    contentString: 'More info',
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`contentString`](#test-helper-option-contentstring)
- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipRendered()

Asserts that a tooltip or popover has been rendered in the DOM.

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipRendered } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip />`);

  await triggerEvent(this.element, 'mouseenter');

  assertTooltipRendered(assert);
});
```

Please note, `assertTooltipRendered()` does not assert that the tooltip or popover is visible to the user - use [assertTooltipVisible()](#asserttooltipvisible) for that.

Given this addon's lazy rendering capabilities (explained in [`targetId`](#targetid)), tooltips will not be rendered until the target is interacted with.

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipNotRendered()

Asserts that a tooltip or popover has not been rendered in the DOM.

Why is this test helper useful? Well, given this addon's lazy rendering capabilities (explained in [`targetId`](#targetid)), tooltips may not be rendered until the target is interacted with.

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipNotRendered } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip />`);

  assertTooltipNotRendered(assert);
});
```

This helper does not assert that the tooltip or popover is not visible to the user. The assertion will fail if the tooltip or popover is not visible to the user but is still rendered in the DOM. If you want to assert that a tooltip or popover is not visible once it's rendered in the DOM, use [assertTooltipNotVisible()](#asserttooltipnotvisible).

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipVisible()

Asserts that a tooltip or popover is visible.

For example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip />`);

  await triggerEvent(this.element, 'mouseenter');

  assertTooltipVisible(assert);
});
```

You may use this helper with a variety of different user interactions. Here's an example that asserts that a tooltip is shown when the user focusses on an input:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`
    <input id="url-input">
    <EmberTooltip @targetId="url-input" />
  `);

  await triggerEvent('#url-input', 'focus');

  /* Asserts that the tooltip is made visible when the user focuses on the input */

  assertTooltipVisible(assert);
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipNotVisible()

Asserts that a tooltip or popover is not visible.

This helper is usually used in conjunction with [triggerTooltipTargetEvent()](#triggertooltiptargetevent) to assert that a particular user interaction hides a tooltip to the user.

For example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
} from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip />`);

  const { element } = this;

  /* Hover over the target to show the tooltip... */

  await triggerEvent(element, 'mouseenter');

  assertTooltipVisible(assert);

  /* Stop hovering over the target in order to hide the tooltip... */

  await triggerEvent(element, 'mouseleave');

  assertTooltipNotVisible(assert);
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipSide()

Asserts that a tooltip or popover is rendered on the correct side of [the target](#targetid).

This helper tests [the side option](#side) that can be passed to tooltips and popovers.

An options hash is required and it must contain a `side` property. For example:

```js
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @side="right" @isShown={{true}} />`);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  assertTooltipSide(assert, {
    side: 'right',
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`side`](#test-helper-option-side)
- [`targetSelector`](#test-helper-option-targetselector)

#### assertTooltipSpacing()

Asserts that a tooltip or popover is rendered a given number of pixels from [the target](#targetid).

This helper tests [the spacing option](#spacing) that can be passed to tooltips and popovers.

An options hash is required and it must contain `spacing` and `side` properties. For example:

```js
import { assertTooltipSpacing } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @spacing={{35}} @isShown={{true}} />`);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  assertTooltipSpacing(assert, {
    side: 'right', /* Side is required */
    spacing: 35,
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)
- [`side`](#test-helper-option-side)
- [`spacing`](#test-helper-option-spacing)
- [`targetSelector`](#test-helper-option-targetselector)

### Test helper options

Most test helpers accept a second, optional param called `options`. This is an object you can pass that customizes various options in a test. The properties you can pass via `options` for each test helper is listed above. Below you will find more information for each property.

- [Content string](#test-helper-option-contentstring)
- [Selector](#test-helper-option-selector)
- [Side](#test-helper-option-side)
- [Spacing](#test-helper-option-spacing)
- [Target selector](#test-helper-option-targetselector)

#### Test helper option: `contentString`

The content string you expect the tooltip or popover to have.

| Type    |Default  |
|---------|---------|
| String  | null    |

Usage example:

```js
import { assertTooltipContent } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @text="More info" @isShown={{true}} />`);

  assertTooltipContent(assert, {
    contentString: 'More info',
  });
});
```

#### Test helper option: `selector`

The selector of the tooltip or popover you are testing.

If more than one tooltip or popover is found in the DOM when you run an assertion, you will be asked to specify this.

| Type    | Default |
|---------|---------|
| String  | `'.ember-tooltip, .ember-popover'` |

Usage example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`
    <EmberTooltip />
    <EmberTooltip class="differentiator" />
  `);

  await triggerEvent(this.element, 'mouseenter');

  assertTooltipVisible(assert, {
    selector: '.differentiator', /* Or whatever class you added to the desired tooltip */
  });
});
```

#### Test helper option: `side`

The value for the tooltip or popover's [`side` option](#side) that you are asserting.

| Type    | Default  |
|---------|----------|
| String  | `null`   |

For example, if you specify for the tooltip or popover be shown on the right of the target using `side='right'`, you will pass `side: 'right'` in assertions that test side. Here is the code for this example:

```js
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @side="right" @isShown={{true}} />`);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  assertTooltipSide(assert, {
    side: 'right',
  });
});
```

#### Test helper option: `spacing`

The value for the tooltip or popover's [`spacing` option](#spacing) that you are asserting. Specify as a number of pixels expected (without a `px` unit).

| Type    | Default  |
|---------|----------|
| Number  | `null`   |

For example, if you specify for the tooltip or popover be shown on the right of the target using `side='right'`, you will pass `side: 'right'` in assertions that test side. Here is the code for this example:

```js
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`<EmberTooltip @spacing={{35}} @isShown={{true}} />`);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

  assertTooltipSide(assert, {
    side: 'right', /* Side is required */
    spacing: 35,
  });
});
```

#### Test helper option: `targetSelector`

The selector of the target element of the tooltip or popover you are testing.

If more than one tooltip or popover is found in the DOM with a particular selector
when you run an assertion, you will be asked to specify this.

| Type    | Default  |
|---------|----------|
| String  | `'.ember-tooltip-target, .ember-popover-target'` |

Usage example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`
    <div class="target-a">
      <EmberTooltip class="common-tooltip" @side="top" @isShown={{true}} @text="Hi" @effect="none" />
    </div>
    <div class="target-b">
      <EmberTooltip class="common-tooltip" @side="left" @isShown={{true}} @text="Bye" @effect="none" />
    </div>
  `);

  assertTooltipVisible(assert, {
    targetSelector: '.target-b', /* Or whatever class you added to the target element */
  });
});
```

## Accessibility

This addon aims to meet 508 compliance.

Elements with tooltips are given a `tabindex` attribute and when the element receives focus, the tooltip will show.

Additionally, the `aria-describedby`, `title`, `id`, and `role` attributes are managed by this addon.

There is always room for improvement and PRs to improve accessibility are welcome.

## Development

This project is maintained by:

[![Duncan Walker](https://avatars1.githubusercontent.com/u/4495352?s=70&v=4)](https://github.com/sir-dunxalot) | [![Max Fierke](https://avatars3.githubusercontent.com/u/354236?s=70&v=4)](https://github.com/maxfierke) |
--- | --- |
[Duncan Walker](https://github.com/sir-dunxalot) | [Max Fierke](https://github.com/maxfierke) |

All PRs and issues are welcome to the following branches:

- `master` for `3.x` improvements and bug fixes
- `2.x` for `2.x` improvements and bug fixes

Before starting work on a PR, please read the quick guide, [CONTRIBUTING](https://github.com/sir-dunxalot/ember-tooltips/blob/master/CONTRIBUTING.md), to save you time and energy!

## Maintainer information

To release an update to the demo app (for maintainers only):

```sh
git checkout master # make sure you're on master branch
ember github-pages:commit --message "Some commit message" # Builds the app
git push origin gh-pages:gh-pages # Deploys the app
```
