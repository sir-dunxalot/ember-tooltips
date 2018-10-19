# Upgrading to 3.0 from 2.x

ember-tooltips 3.x replaces the underlying tooltip implementation with the robust
and mature [`tooltip.js`](https://popper.js.org/tooltip-examples.html) library powered by [`popper.js`](https://popper.js.org/). It has enabled a simpler ember-tooltips implementation,
while providing more functionality and coverage for use cases not easily supported
by earlier versions of ember-tooltips.

## Migrating existing code

We've done our best to make the upgrade from 2.x to 3.x as smooth as possible,
by preserving a similar component API and mostly compatible test helpers.

### 1. Update component names

ember-tooltips now provides one component for tooltips, `ember-tooltip`, and one
component for popovers, `ember-popover`.

For the most part you can find-and-replace all uses of `tooltip-on-component`
and `tooltip-on-element` with `ember-tooltip`, and `popover-on-component` and
`popover-on-element` with `ember-popover`.

### 2. Remove deprecated options

If you have specified these options in the past, you should remove them, as they
no longer apply to ember-tooltips 3.x:

* `setPin` - No longer needed
* `keepInWindow` - All tooltips are now kept in the window by default. See
  [`popperOptions`](README.md#popper-options) for overriding this behavior via popper.js modifiers.
* `enableLazyRendering`

e.g.

```patch
-      {{#tooltip-on-element
-        class="user-banner__photo__tooltip js-user-photo-tooltip"
-        enableLazyRendering=true
-        side='right'}}
+      {{#ember-tooltip
+        class="js-user-photo-tooltip"
+        tooltipClassName="ember-tooltip user-banner__photo__tooltip"
+        side='right'}}
         <img src={{user.photo_url}} alt="User photo" />
-      {{/tooltip-on-element}}
+      {{/ember-tooltip}}
```

### 3. Update `class` and `tooltipClassName`

When specifying `class` with an `ember-tooltip`, this will apply to the tooltip
wrapper component, but will not contain the actual tooltip content. `class` may
still be used for targeting tooltips using the `ember-tooltips` test helpers.

For other uses where you're looking to set a class on the actual tooltip used
for display (e.g. changing styling), use `tooltipClassName`, which will
apply to the `popper.js` tooltip instance in the DOM.

e.g.

```hbs
{{!-- app/components/some-component.hbs --}}
{{ember-tooltip
  text="Hello"
  class="js-my-test-tooltip"
  tooltipClassName="ember-tooltip tooltip-warning"
}}
```

```css
/* app/styles/my-tooltips.css */
.tooltip-warning {
  background-color: yellow;
  color: black;
}
```

```javascript
// tests/integration/components/some-component-test.js
assertTooltipContent(assert, {
  contentString: 'Hello',
  selector: '.js-my-test-tooltip',
})
```

### 4. Migrating test helpers

The test helpers have remained with the same API. However, there are a few notable
changes:

#### 4.1 Updating test helper import path

The test helper import paths have changed. Update `YOUR_APP_MODULE/tests/helpers/ember-tooltips` to `ember-tooltips/test-support`

```patch
import {
    assertTooltipVisible,
    assertTooltipNotVisible,
-  findTooltip,
-  triggerTooltipTargetEvent
-} from 'my-cool-app/tests/helpers/ember-tooltips';
+  findTooltip
+} from 'ember-tooltips/test-support';
```

#### 4.2 Replace `triggerTooltipTargetEvent` test helper

The `triggerTooltipTargetEvent` test helper has been removed.
Please use `triggerEvent` from `@ember/test-helpers` (or `ember-native-dom-helpers`,
if you're not using the latest test helpers.)

```patch
-    it('shows the thing I want when condition is true', function() {
+    it('shows the thing I want when condition is true', async function() {
        await render(hbs`{{ember-tooltip text='Hello' class="my-tooltip-target"}}`);
        const someTooltipTarget = this.$('.my-tooltip-target');
-      triggerTooltipTargetEvent(someTooltipTarget, 'mouseenter');
+      await triggerEvent(someTooltipTarget[0], 'mouseenter');
```

#### 4.3 Specifying `targetSelector` where needed

While the test helper APIs remain unchanged, due to DOM structure changes in
ember-tooltips, you may need to specify the [`targetSelector`](README.md#test-helper-option-targetselector)
option to target the correct tooltip.

Luckily, your test suite should let you know where this is needed!

### 5. Updating any CSS Overrides

If you were previously overriding CSS styles of `ember-tooltips`, your rules will
need to be updated to support 3.x. While by default, the tooltips should look about
the same, the underlying DOM structure and CSS classes used have changed.

If you were using CSS workarounds for positioning the tooltip, they may no longer
be needed, as `popper.js` is smarter about positioning and provides
some broader control over it. For example, position variants supported by
`popper.js` may supplant the need for some custom positioning CSS. See [`side`](README.md#test-helper-option-side)
option for more details.
