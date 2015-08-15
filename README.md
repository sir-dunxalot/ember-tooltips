Ember-tooltips [![Build Status](https://travis-ci.org/sir-dunxalot/ember-tooltips.svg)](https://travis-ci.org/sir-dunxalot/ember-tooltips)
======

Render simple tooltips on components, views, HTML elements, and more using simple strings, HTMLBars, bound properties, and more.

Powered by <a href="http://darsa.in/tooltip/" target="_blank">darsain/tooltip (demo here)</a>.

## Installation

```
ember install ember-tooltips
```

## Usage

Documentation for usage is below:

- [Supported properties](#supported-properties)
- [Using on helpers](#using-on-helpers)
- [Using as a component](#using-as-a-component)
- [Using on HTML elements](#using-on-html-elements)
- [Customizing the mixin](#customizing-the-mixin)

### Supported Properties

This addon aims to maintain parity with all Tooltip library features. Current supported properties are:

- auto (true or false. Defaults to true)
- duration (time in milliseconds. No default)
- effectClass (none, fade, slide, or grow. Defaults to slide)
- event (any kind of [jQuery event](https://api.jquery.com/category/events/) or "manual", defaults to hover)
- place (defaults to top)
- spacing (defaults to 10)
- typeClass (can be any string. No default)
- visibility (true or false, when `event: 'manual'`. No default)

**Please note**, depending on your use case, you may have to prefix or modify the property name. For example, `effectClass`, `tooltipEffectClass` or `tooltip-effect-class`. More info is in each section below.

Default values can be set [on the `ember-tooltips` mixin](#customizing-the-mixin).

### Using on Helpers

The most common way to use a tooltip is on a helper. Examples of such helpers are `{{#link-to}}`, `{{some-component}}`, or `{{view 'table'}}`.

All supported properties should be prefixed by `tooltip` and should be camelCased.

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

Here's an example on a `{{link-to}}` helper and HTML:

```hbs
{{#link-to 'danger-zone' tooltipContent="<strong>I'm warning you!</strong>"}}
  Don't click me!
{{/link-to}}
```

Or with dynamic content:

```hbs
{{#each picture in model}}
  {{#link-to picture tooltipContent=picture.description}}
    {{some-img-component src=picture.url}}
  {{/link-to}}
{{/each}}
```

To manually set the tooltip's visibility with a boolean property:

```hbs
{{#some-component
  tooltipContent='This tooltip is triggered manually via attribute'
  tooltipEvent='manual'
  tooltipVisibility=showTooltip
}}
  I'll show a tooltip if you want me to...
{{/some-component}}
```

Tooltips can be automatically closed after a specified duration:

```hbs
{{input type='text'
  tooltipEvent='focus'
  tooltipContent='Helpful form tip'
  tooltipDuration='1000'
  tooltipPlace='right'
}}
```

### Using as a Component

If you want to use HTMLBars in your tooltip, then the `{{tooltip-on-parent}}` component is your friend.

*Please note, normal HTML can be passed with the `tooltipContent` param.*

This component registers itself on the parent view and the content of the `{{tooltip-on-parent}}` component will be rendered inside the tooltip. The tooltip is automatically attached to the parent view's element.

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

If you want to render a tooltip on an HTML element that isn't rendered by an Ember View then data attributes will be your solution. Be sure to include the `has-tooltip` class on each HTML element that contains a tooltip.

Please note, you must call the `renderChildTooltips()` method of the parent view in order to render the tooltips.

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

export default Ember.Component.extend({

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
      data-tooltip-type-class="tooltip-error">

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

### Customizing the Mixin

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

Each Option corresponds to a class on the Ember namespace. For example, `addTo: ['Input']` corresponds to `Ember.Input`.

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

```
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

## Development

- `git clone https://github.com/sir-dunxalot/ember-tooltips.git`
- `ember s`
- `ember test` or `/tests` route

A huge thank you to those who have identified and opened issues, in particular the contributors:

- @davidgovea
- @kmiyashiro
- @cdl
