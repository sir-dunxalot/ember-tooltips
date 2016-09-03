Ember-tooltips [![Build Status](https://travis-ci.org/sir-dunxalot/ember-tooltips.svg)](https://travis-ci.org/sir-dunxalot/ember-tooltips) [![npm](https://img.shields.io/npm/v/ember-tooltips.svg)](https://www.npmjs.com/package/ember-tooltips)
======

Render tooltips on components and other HTML elements using HTMLBars.

## Installation

```
ember install ember-tooltips
```

## Documentation

Documentation for usage is below:

- [Demo](http://sir-dunxalot.github.io/ember-tooltips/)
- [1.0.0 Release](#100-release)
- [Usage](#usage)
  - [tooltip-on-component](#tooltip-on-component)
  - [tooltip-on-element](#tooltip-on-element)
- [Options](#options)
  - [Setting defaults](#setting-defaults)
- [Actions](#actions)
- [Accessibility](#accessibility)

## 1.0.0 Release

Version 1.0.0 removed <a href="http://darsa.in/tooltip/" target="_blank">darsain/tooltip</a> as a dependency, in favor of using custom Ember code.

You can use and see the pre-1.0 version on [this branch](https://github.com/sir-dunxalot/ember-tooltips/tree/pre-1.0). Alternatively, install `"ember-tooltips": "0.7.0"` in your `package.json`.

## Usage

### Tooltip on Component

The easiest way to add a tooltip to any component is with the `{{tooltip-on-component}}` component:

```hbs
{{#my-component}}
  Hover for more info

  {{#tooltip-on-component}}
    Here is the info in a tooltip!
  {{/tooltip-on-component}}
{{/my-component}}
```

Options can be set on the `{{tooltip-on-component}}` as attributes:

```hbs
{{#my-component}}
  Click for more info

  {{#tooltip-on-component event='click'}}
    This info will show on click!
  {{/tooltip-on-component}}
{{/my-component}}
```

Documentation for supported options is located [here](#options).

### Tooltip on Element

If you want to add a tooltip to an element that is not an Ember component, you can do so with `{{tooltip-on-element}}`.

By default, the tooltip will attach itself to its parent element:

```hbs
<div>
  Hover for more info

  {{#tooltip-on-element}}
    Here is the info in a tooltip!
  {{/tooltip-on-element}}
</div>
```

You can also specify the ID of the element to attach the tooltip to:

```hbs
{{input id='has-info-tooltip'}}

{{#tooltip-on-element target='#has-info-tooltip'}}
  Here is some more info
{{/tooltip-on-element}}
```

The `target` property must be an ID, including the `#`.

## Options

Options are set as attributes on the tooltip components. Current tooltip properties this addon supports are:

- [class](#class)
- [delay](#delay)
- [delayOnChange](#delay-on-change)
- [duration](#duration)
- [effect](#effect)
- [event](#event)
- [hideOn](#hideOn)
- [keepInWindow](#keep-in-window)
- [side](#side)
- [showOn](#show-on)
- [spacing](#spacing)
- [isShown](#is-shown)

#### Class

| Type    | String  |
|---------|---------|
| Default | none    |

Adds a class to any tooltip:

```hbs
{{tooltip-on-component class='tooltip-warning'}}
```

#### Delay

| Type    | Number  |
|---------|---------|
| Default | 0       |

Delays showing the tooltip by the given number of milliseconds.

```hbs
{{!--Delays the show animation by 500ms--}}

{{tooltip-on-component delay=500}}
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

{{tooltip-on-component delayOnChange=true}}
```

#### Duration

| Type    | Number  |
|---------|---------|
| Default | 0       |

Sets the duration for which the tooltip will be open, in milliseconds. When the tooltip has been opened for the duration set it will hide itself.

The user will still hide the tooltip if the hide event occurs before the duration expires.

```hbs
{{!-- Closes the tooltip after 1000ms--}}

{{tooltip-on-component duration=1000}}
```

#### Effect

| Type    | String  |
|---------|---------|
| Default | 'slide' |

Sets the animation used to show and hide the tooltip. Possible options are:

- `'fade'`
- `'slide'`
- `'none'`

```hbs
{{tooltip-on-component effect='slide'}}
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
{{tooltip-on-component event='click'}}
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

{{tooltip-on-component
  event='click'
  hideOn='mouseleave'
}}
```

This does not affect the event the tooltip shows on. That is set by the [showOn](#show-on) option. This will override [the event property](#event).

#### Keep in window

| Type    | Boolean |
|---------|---------|
| Default | true    |

Whether to automatically try keep the tooltip in the window. This will override any `side` you set if the tooltip is rendered partically outside the window.

For example, a target element in the top-left of the screen with a tooltip's side set to `left` will probably render the tooltip on the right of the target element.

```hbs
{{!--Forces the tooltip to stay on the left even if
it will render off-screen--}}

{{tooltip-on-component
  keepInWindow=false
  side='right'
}}
```

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

{{tooltip-on-component
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

{{tooltip-on-component
  showOn='click'
}}
```

This does not affect the event the tooltip hides on. That is set by the [hideOn](#hide-on) option. This will override [the event property](#event).

#### Spacing

| Type    | Number  |
|---------|---------|
| Default | 10      |

Sets the number of pixels the tooltip will render from the target element. A higher number will move the tooltip further from the target. This can be any number.

```hbs
{{!--Render the tooltip 20px from the target element--}}
{{tooltip-on-component spacing=20}}
```

#### Tooltip is shown

| Type    | Boolean |
|---------|---------|
| Default | false   |

Gives you a programatic way to hide and show a tooltip. Set this value to `true` to manually show the tooltip.

This can be useful alongside `event='none'` when you only want to toolip to show when you specific and not based on an user action.

```hbs
{{!--Binds the tooltip visibility to the showTooltip property--}}
{{tooltip-on-component isShown=showTooltip}}
```

### Setting Defaults

You can set the default for any option by extending the `{{tooltip-on-element}}` component:

```js
{{!--your-app/components/tooltip-on-element}}--}}

import TooltipOnElementComponent from 'ember-tooltips/components/tooltip-on-element';

export default TooltipOnElementComponent.extend({
  effect: 'fade',
  side: 'bottom',
});
```

## Actions

Four actions are available for you to hook onto through the tooltip lifecycle:

```hbs
{{tooltip-on-component
  onTooltipDestroy='onTooltipDestroy'
  onTooltipHide='onTooltipHide'
  onTooltipRender='onTooltipRender'
  onTooltipShow='onTooltipShow'
}}
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
