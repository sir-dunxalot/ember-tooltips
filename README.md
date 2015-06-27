# Ember-tooltips

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
- [using on HTML elements](#using-on-html-elements)

### Supported Properties

This addon aims to maintain parity with all Tooltip library features. Current supported properties are:

- auto (true or false. Defaults to true)
- effectClass (none, fade, slide, or grow. Defaults to slide)
- event (currently just hover)
- place (defaults to top)
- spacing (defaults to 10)
- typeClass (can be any string. No default)

Please note that, depending on your use case, you may have to prefix or modify the property name. For example, `effectClass`,tooltipEffectClass` or `tooltip-effect-class`. More info is in each section below.

### On helper

The most common way to use a tooltip is on a helper. Examples of such helpers are `{{#link-to}}`, `{{#some-component}}`, or `{{view 'table'}}`.

All properties should be prefixed by `tooltip` and should be camelCased.

Usage is simple:

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

### Using as a Component

If you want to use HTMLBars in your tooltip, then the `{{tooltip-on-parent}}` component is your friend.

This component registers itself on the parent view and the content of the `{{tooltip-on-parent}}` component will be rendered inside the tooltip. The tooltip is automatically attached to the parent view's element.

```hbs
{{#some-component}}
  {{#tooltip-on-parent}}
    Stop hovering over me, {{name}}!
  {{/tooltip-on-parent}}

  Dont' hover over me!
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

If you want to render a tooltip on an HTML element that isn't rendered by a Ember View then data attributes will be your solution.

Please note, you must call the `renderChildTooltips()` method of the parent view in order to render the tooltips.

```hbs
{{#some-component}}
  <ul class="list">
    <li tooltip-content="Dave is great">Dave</li>
    <li tooltip-content="Mike is not great">Mike</li>
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

Options can be set on the elements ad <strong>prefixed and dasherized</strong> attributes. For example:

```hbs
{{#some-component}}
  <div class="notification">
    <span
      tooltip-content="This is bad!"
      tooltip-effect-class="grow"
      tooltip-type-class="tooltip-error">

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

## Development

- `git clone https://github.com/sir-dunxalot/ember-tooltips.git`
- `ember s`
- `ember test` or `/tests` route
