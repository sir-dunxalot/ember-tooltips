Ember-tooltips [![Build Status](https://travis-ci.org/sir-dunxalot/ember-tooltips.svg)](https://travis-ci.org/sir-dunxalot/ember-tooltips) [![npm](https://img.shields.io/npm/v/ember-tooltips.svg)](https://www.npmjs.com/package/ember-tooltips)
======

Render simple tooltips on components, views, HTML elements, and more using simple strings, HTMLBars, bound properties, and more.

Powered by <a href="http://darsa.in/tooltip/" target="_blank">darsain/tooltip</a>. You can see [a demo here](http://sir-dunxalot.github.io/ember-tooltips/).

## Installation

```
ember install ember-tooltips
```

## Documentation

Documentation for usage is below:

- [Usage](#usage)
  - [On helpers](#using-on-helpers)
  - [As a component](#using-as-a-component)
  - [On HTML elements](#using-on-html-elements)
- [Supported properties](#supported-properties)
- [The Tooltip Object](#the-tooltip-object)
- [Hiding and Showing Tooltips](#hiding-and-showing-tooltips)
- [Accessibility](#accessibility)
- [The Tooltip Mixin (and changing default values)](#the-tooltip-mixin)
- [The Tooltip Utility](#the-tooltip-utility)

## Usage

### Using on Helpers

The most common way to use a tooltip is on a helper like `{{#link-to}}` or `{{some-component}}`.

All [supported properties](#supported-properties) should be camelCased and prefixed by `tooltip`.

To add a tooltip to any component:

```hbs
{{#some-component tooltipContent='This is the tooltip'}}
  Hover over me!
{{/some-component}}
```

You can use multiple options:

```hbs
{{#some-component
  tooltipContent='This is the tooltip'
  tooltipPlace='Right'
  tooltipSpacing=50
}}
  Hover over me!
{{/some-component}}
```

### Using as a Component

If you want to use HTMLBars in your tooltip, then the `{{tooltip-on-parent}}` component is your friend.

The tooltip is automatically attached to the parent view's element and the template block of the `{{tooltip-on-parent}}` component will be rendered inside the tooltip.

```hbs
{{#some-component}}
  {{#tooltip-on-parent}}
    Stop hovering over me, {{name}}!
  {{/tooltip-on-parent}}

  Don't hover over me!
{{/some-component}}
```

camelCased Options can still be passed to the component but they are not prefixed:

```hbs
{{#some-component}}
  {{#tooltip-on-parent place='right' effectClass='grow'}}
    <strong>Stop hovering over me, {{name}}!</strong>
  {{/tooltip-on-parent}}

  Dont' hover over me!
{{/some-component}}
```

### Using on HTML elements

If you want to render a tooltip on an HTML element that isn't rendered by an Ember Component, you can use `data` attributes.

1. Add the `has-tooltip` class
2. Add `data-<x>` attributes to set tooltip properties
3. Call `this.renderChildTooltips()` in a parent view that has the tooltips mixin included (usually this mixin is automatically added to all components. See [the tooltips mixin](#the-tooltip-mixin))

For example, to render two tooltips:

```hbs
{{#some-component}}
  <ul class="list">
    <li class="has-tooltip" data-tooltip-content="Dave is great">Dave</li>
    <li class="has-tooltip" data-tooltip-content="Mike is not great">Mike</li>
  </ul>
{{/some-component}}
```

```js
// app/components/some-component.js

import Ember from 'ember';
import TooltipsMixin from 'ember-tooltips/mixins/components/tooltips';

export default Ember.Component.extend(
  TooltipsMixin, {

  didInsertElement: function() {
    this.renderChildTooltips(); // Voila!
  },

});
```

Options can be set on the element(s) as <strong>prefixed and dasherized</strong> attributes. For example:

```hbs
{{#some-component}}
  <div class="notification">
    <span
      class="has-tooltip"
      data-tooltip-content="This is bad!"
      data-tooltip-effect-class="grow"
      data-tooltip-type-class="error">

      Hover for more info

    </span>
  </div>
{{/some-component}}
```

```js
// app/components/some-component.js

import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function() {
    this.renderChildTooltips(); // Voila!
  },

});
```

**Warning:** Using HTML `data-x` attributes has limitations. Durations and manual triggers are not supported.

### Supported Properties

This addon aims to maintain parity with all the [Tooltip library](https://github.com/darsain/tooltip/wiki) features.

Current tooltip properties this addon supports are:

- `auto` (`true` or `false`. Defaults to `true`)
- `duration` (time in milliseconds. No default)
- `effectClass` (`'none'`, `'fade'`, `'slide'`, or `'grow'`. Defaults to `'slide'`)
- `event` (see [events](#events))
- `hideOn` (see [events](#events))
- `place` (defaults to `'top'`)
- `showOn` (see [events](#events))
- `spacing` (defaults to `10`)
- `typeClass` (can be any string. No default)
- `visibility` (`true` or `false`, when `event: 'manual'`. No default)

**Please note**, depending on your use case, you may have to prefix or modify the property name. For example, `effectClass`, `tooltipEffectClass` or `data-tooltip-effect-class`.

Default values can be set [on the `ember-tooltips` mixin](#customizing-the-mixin).

```hbs
{{input type='text'
  tooltipEvent='focus'
  tooltipContent='Helpful form tip'
  tooltipDuration='1000'
  tooltipPlace='right'
}}
```

### The Tooltip Object

Any time a tooltip is created for a component, the tooltip is set as the `tooltip` property of the component.

Thus, you can programatically control the tooltip of any Ember component using `this.get('tooltip')`. This will return the `Tooltip` instance, which is created using [`darsain/tooltip`](https://github.com/darsain/tooltip/wiki/Tooltip).

The documentation for the tooltip is contained in [the `Tooltip` API wiki](https://github.com/darsain/tooltip/wiki/Tooltip).

For example:

```js
/* Change the tooltip content */
this.get('tooltip').content('This is the new content');

/* Show the tooltip  */
this.get('tooltip').show();

/* Get the tooltip's DOM element  */
this.get('tooltip').element;

/* Update the size after the tooltip content changes */
this.get('tooltip').updateSize();

/* See if the tooltip is already hidden */
this.get('tooltip').hidden; // 1 or 0
```

### Hiding and Showing Tooltips

There are three ways to hide and show tooltips:

- [Events](#events)
- [Methods](#methods)
- [Timers](#timers)

#### Events

You can control the hiding and showing of tooltips on set jQuery events using three properties: `event`, `showOn`, and `hideOn`.

Version `0.5.5` and lower does *not* support `hideOn` and `showOn`.

`event` is the easiest way to set the hide and show event - it sets the `hideOn` and `showOn` properties.

`event` should be a string equal to `'hover'`, `'click'`, `'focus'`, `'ready'` (show on load of DOM), or `'none'`. The default value is `'hover'`.

```hbs
{{some-component
  tooltipContent='This will show on hover'
  tooltipEvent='hover'
}}
```

If you want to set the show or hide events individually, you can overwrite `event` using `showOn` and `hideOn`. Both properties accept any [jQuery event](https://api.jquery.com/category/events/) or `'none'`.

For example:

```hbs
{{some-component
  tooltipHideOn='none'
  tooltipShowOn='click'
  tooltipContent='hover'
}}
```

Default values for `event`, `hideOn`, and `showOn` can be set [on the `ember-tooltips` mixin](#customizing-the-mixin).

Version `0.5.5` and lower of this addon use 'manual' instead of 'none'.

#### Methods

As described in [The Tooltip Object](#the-tooltip-object) documentation, you can access the `tooltip` property on any component.

Thus, you can programatically hide and show the tooltip of any component as follows:

```js
this.get('tooltip').hide();
this.get('tooltip').show();
```

If you want to check whether a tooltip is currently hidden, access the `hidden` property:

```
this.get('tooltip').hidden; // 1 or 0
```

#### Timers

You can set a timer on a tooltip to close it after an amount of time using the `duration` property. Duration should be any number of milliseconds.

```hbs
{{input type='text'
  tooltipEvent='focus'
  tooltipContent='Helpful form tip'
  tooltipDuration='1000'
}}
```

In the above example, the tooltip shows on focus and then closes after 1000ms.

### Accessibility

This addon aims to meet 508 compliance.

Components with tooltips are given a `tabindex` attribute and when the component receives focus, the tooltip with show.

Additionally, the `aria-describedby`, `title`, `id`, and `role` attributes are managed by this addon.

There is always room for improvement and PRs to improve accessibility are welcome.

### The Tooltip Mixin

By default the `ember-tooltips` mixin is added to all components. This mixin contains the helper methods to render tooltips.

You can customize where the mixin is automatically added by overriding the `addTo` option in your `config/environment.js` file:

```js
module.exports = function(environment) {
  var ENV = {

    /* ... */

    tooltips: {
      addTo: ['Component'], // Ember.Component
    }
  }
};
```

Each option corresponds to a class on the Ember namespace. For example, `addTo: ['Input']` corresponds to `Ember.Input`.

You can disable all reopening of classes by seting `addTo` to a falsy value or empty array:

```js
module.exports = function(environment) {
  var ENV = {

    /* ... */

    tooltips: {
      addTo: [], // The mixin is not added to anything
    }
  }
};
```

You can add the tooltip functionality to individual classes by importing the mixin to your class:

```js
// app/components/big-button.js

import Ember from 'ember';
import TooltipsComponent from 'ember-tooltips/mixins/components/tooltips';

export default Ember.Component.extend(
  TooltipsComponent, {

});
```

To set default values for [supported properties](#supported-properties) across your application, set the values in the mixin in your app tree:

```js
// app/mixins/components/tooltips.js

import Ember from 'ember';
import EmberTooltipsMixin from 'ember-tooltips/mixins/components/tooltips';

export default Ember.Mixin.create(
  EmberTooltipsMixin, {

  tooltipPlace: 'right',
  tooltipSpacing: 20,
});
```

You can see the [tooltips mixin here](https://github.com/sir-dunxalot/ember-tooltips/blob/master/addon/mixins/components/tooltips.js).

### The Tooltip Utility

All tooltips rendered by this addon use the [`renderTooltip()` utility](https://github.com/sir-dunxalot/ember-tooltips/blob/master/addon/utils/render-tooltip.js).

You can use this utility in your application if none of the given use cases work:

```js
import Ember from 'ember';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

export default Ember.Component.extend({

  AddTheTooltip() {
    const element = this.$().find('#some-element')[0];

    renderTooltip(element, {
      content: 'Some extra info',
      event: 'click',
      place: 'right',
    });
  },

});
```

## Development

All PRs and issues are welcome.

- `git clone https://github.com/sir-dunxalot/ember-tooltips.git`
- `cd ember-tooltips`
- `npm install && bower install`
- `ember s`
- `ember test`, `ember try:testall`, or the `/tests` route

You do not need to bump the version when you have a PR.
