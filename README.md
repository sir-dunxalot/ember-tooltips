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
  - [Targets](#targets)
- [Options](#options)
  - [Setting defaults](#setting-defaults)
- [Actions](#actions)
- [Testing](#testing)
  - [Test helpers](#test-helpers)
- [Accessibility](#accessibility)
- [Development](#development)

## Usage

This documentation is for the `3.x` version of ember-tooltips. For `2.x` documentation, please refer to the [2.x branch README](https://github.com/sir-dunxalot/ember-tooltips/tree/2.x).

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

  {{#ember-tooltip}}
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

```hbs
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
- [isShown](#is-shown)
- [popoverHideDelay (popover only)](#popover-hide-delay)
- [popperContainer](#popper-container)
- [popperOptions](#popper-options)
- [side](#side)
- [showOn](#show-on)
- [spacing](#spacing)
- [text (tooltip only)](#text)

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

This option does not affect the event the tooltip shows on. That is set by the [showOn](#show-on) option. This will override [the event property](#event) in deciding when the tooltip is hidden.

#### Popper container

| Type | `HTMLElement` \| `String` \| `false` |
|---|---|
| Default | false |

Appends the tooltip to a specific element.  By default, the tooltip will be rendered as a sibling of its target. This attribute can be set to render the tooltip elsewhere in the DOM.  See the [tooltip.js container option](https://popper.js.org/tooltip-documentation.html#new_Tooltip_new).

```hbs
{{!--Renders the tooltip as a child of the body element--}}

{{ember-tooltip popperContainer='body'}}
```

#### Popper options

| Type    | Object |
|---------|--------|
| Default | null   |

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
      {{ember-tooltip text=item.tooltip popperOptions=popperOptions}}
    </div>
  {{/each}}
</div>
```

Note that `popperOptions` is only applied during tooltip creation and that it is
not reapplied if the value changes after the tooltip is rendered.

#### Side

| Type    | String  |
|---------|---------|
| Default | 'top'   |

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
{{ember-tooltip isShown=showTooltip event='none'}}
```

#### Popover hide delay

| Type    | Number |
|---------|---------|
| Default | 250   |

**POPOVER ONLY:** The number of milliseconds before the popover will hide after the user hovers away from the popover and the popover target. This is only applicable when `event='hover'`.

```hbs
{{ember-popover event='hover' popoverHideDelay=300}}
```

![popover-hover](https://cloud.githubusercontent.com/assets/7050871/18113238/e010ee64-6ee2-11e6-9ff1-a0c674a6d702.gif)

### Setting Defaults

You can set the default for any option by extending the `{{ember-tooltip}}` or `{{ember-popover}}` component:

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
and prevent tooltip or popover content from appearing.

## Actions

Four actions are available for you to hook onto through the tooltip/popover lifecycle:

```hbs
{{ember-tooltip
  onDestroy=(action 'onDestroy')
  onHide=(action 'onHide')
  onRender=(action 'onRender')
  onShow=(action 'onShow')
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

All assert helpers require `assert` to be passed as the first param and some accept a second, optional param for additional test options. For detailed usage instructions and examples, see the documentation for each test helper below.

All test helpers can be imported from the following path:

```js
'ember-tooltips/test-support';
```

For example:

```js
/* appname/tests/integration/components/some-component.js */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { assertTooltipRendered } from 'ember-tooltips/test-support';

module('Integration | Component | Some component', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip renders', async function(assert) {

    await render(hbs`{{ember-tooltip isShown=true}}`);

    assertTooltipRendered(assert);
  });
});
```

#### assertTooltipContent()

Asserts that a tooltip or popover has content that matches a given string.

```js
import { assertTooltipContent } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip text='More info' isShown='true'}}`);

  assertTooltipContent(assert, {
    contentString: 'More info',
  });
});
```

The [options hash](#test-helper-options) accepts:

- [`contentString`](#test-helper-option-contentstring)
- [`selector`](#test-helper-option-selector)

#### assertTooltipRendered()

Asserts that a tooltip or popover has been rendered in the DOM.

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipRendered } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip}}`);

  await triggerEvent(this.element, 'mouseenter');

  assertTooltipRendered(assert);
});
```

Please note, `assertTooltipRendered()` does not assert that the tooltip or popover is visible to the user - use [assertTooltipVisible()](#asserttooltipvisible) for that.

Given this addon's lazy rendering capabilities (explained in [Targets](#targets)), tooltips will not be rendered until the target is interacted with.

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipNotRendered()

Asserts that a tooltip or popover has not been rendered in the DOM.

Why is this test helper useful? Well, given this addon's lazy rendering capabilities (explained in [Targets](#targets)), tooltips may not be rendered until the target is interacted with.

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipNotRendered } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip}}`);

  assertTooltipNotRendered(assert);
});
```

This helper does not assert that the tooltip or popover is not visible to the user. The assertion will fail if the tooltip or popover is not visible to the user but is still rendered in the DOM. If you want to assert that a tooltip or popover is not visible once it's rendered in the DOM, use [assertTooltipNotVisible()](#asserttooltipnotvisible).

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

#### assertTooltipVisible()

Asserts that a tooltip or popover is visible.

For example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip}}`);

  await triggerEvent(this, this.element);

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
    {{ember-tooltip targetId='url-input'}}
  `);

  await triggerEvent($('#url-input')[0], 'focus');

  /* Asserts that the tooltip is made visible when the user focuses on the input */

  assertTooltipVisible(assert);
});
```

The [options hash](#test-helper-options) accepts:

- [`selector`](#test-helper-option-selector)

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

  await render(hbs`{{ember-tooltip}}`);

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

#### assertTooltipSide()

Asserts that a tooltip or popover is rendered on the correct side of [the target](#targets).

This helper tests [the side option](#side) that can be passed to tooltips and popovers.

An options hash is required and it must contain a `side` property. For example:

```js
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip side='right' isShown=true}}`);

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

Asserts that a tooltip or popover is rendered a given number of pixels from [the target](#targets).

This helper tests [the spacing option](#spacing) that can be passed to tooltips and popovers.

An options hash is required and it must contain `spacing` and `side` properties. For example:

```js
import { assertTooltipSpacing } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip spacing=35 isShown=true}}`);

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

| Type    | String |
|---------|---------|
| Default | null |

Usage example:

```js
import { assertTooltipContent } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip text='More info' isShown='true'}}`);

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
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`
    {{ember-tooltip}}
    {{ember-tooltip class="differentiator"}}
  `);

  await triggerEvent(this, this.element);

  assertTooltipVisible(assert, {
    selector: '.differentiator', /* Or whatever class you added to the desired tooltip */
  });
});
```

#### Test helper option: `side`

The value for the tooltip or popover's [`side` option](#side) that you are asserting.

| Type    | String |
|---------|---------|
| Default | `null` |

For example, if you specify for the tooltip or popover be shown on the right of the target using `side='right'`, you will pass `side: 'right'` in assertions that test side. Here is the code for this example:

```js
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip side='right' isShown=true}}`);

  /* Asserts that the tooltip is rendered but not shown when the user hovers over the target, which is this test's element */

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
import { assertTooltipSide } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`{{ember-tooltip spacing=35 isShown=true}}`);

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

| Type    | String |
|---------|---------|
| Default | `'.ember-tooltip-target, .ember-popover-target'` |

Usage example:

```js
import { render, triggerEvent } from '@ember/test-helpers';
import { assertTooltipVisible } from 'ember-tooltips/test-support';

test('Example test', async function(assert) {

  await render(hbs`
    <div class="target-a">
      {{ember-tooltip class="common-tooltip" side='top' isShown=true text='Hi' effect='none'}}
    </div>
    <div class="target-b">
      {{ember-tooltip class="common-tooltip" side='left' isShown=true text='Bye' effect='none'}}
    </div>
  `);

  await triggerEvent(this, this.element);

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
