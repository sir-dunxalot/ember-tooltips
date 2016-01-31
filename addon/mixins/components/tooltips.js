import Ember from 'ember';
import renderTooltip from 'ember-tooltips/utils/render-tooltip';

const { on } = Ember;

export default Ember.Mixin.create({

  /**
  The tooltip object

  @property tooltip
  @type Object
  */

  tooltip: null,

  /**
  A list of Tooltip properties currently supported
  by this addon

  @property tooltipSupportedProperties
  @type Array
  */

  tooltipSupportedProperties: [
    'auto',
    'content',
    'duration',
    'effectClass',
    'event',
    'hideOn',
    'place',
    'showOn',
    'spacing',
    'tabIndex',
    'typeClass',
    'visibility',
  ],

  /* Tooltip options - see http://darsa.in/tooltip/ */

  tooltipAuto: true,
  tooltipContent: null,
  tooltipDuration: null,
  tooltipEffectClass: 'slide', // fade, grow, slide, null
  tooltipEvent: 'hover', // hover, click, focus, ready, or none
  tooltipHideOn: null,
  tooltipPlace: 'top',
  tooltipShowOn: null,
  tooltipSpacing: 10,
  tooltipTabIndex: 0, // A positive integer (to enable) or -1 (to disable)
  tooltipTypeClass: null,
  tooltipVisibility: null, // for manual-mode triggering

  /**
  Removes a tooltip from the DOM if the element it is attached
  to is destroyed.

  @method destroyTooltip
  */

  destroyTooltip: on('willDestroyElement', function() {
    const tooltip = this.get('tooltip');

    if (tooltip) {
      tooltip.effect(null); // Remove animation
      tooltip.detach();     // Remove the tooltip from the document
      this.$().off();       // Remove all event listeners
    }

    /* Remove observer, even if it was never added */

    this.removeObserver('tooltipVisibility', this, this._tooltipVisibilityDidChange);
    this.removeObserver('tooltipContent', this, this._tooltipContentDidChange);
  }),

  /**
  Adds a tooltip to the current component using the values of the tooltip
  properties on this component's helper or, if a `{{tooltip-on-parent}}` component is
  passed, the values set on that component.

  In the latter case, the `{{tooltip-on-parent}}` block template will
  be used for the tooltip content.

  ## Example 1 - Setting values on a component

  ```hbs
  {{#some-component tooltipContent='This will show' tooltipPlace='right'}}
    Hover over me
  {{/some-component}}
  ```

  ## Example 2 - Using a child component

  ```hbs
  {{#some-component}}

    {{#tooltip-on-parent place='right'}}
      This will show
    {{/tooltip-on-parent}}

    Hover over me

  {{/some-component}}
  ```

  Usually you won't have to call the `renderTooltip` method directly but it's still
  made publically available. In the above examples, the components handle calling
  this `renderTooltip()` method at the correct time.

  Supported options are in the format tooltip{$capitalizedProperty} where
  capitalizedProperty is each property, capitalized, in tooltipSupportedProperties.

  @method renderTooltip
  @param [maybeTooltipComponent] An optionally-passed component for a `{{tooltip-on-parent}}` class
  */

  renderTooltip: on('didInsertElement', function(maybeTooltipComponent) {
    const componentWasPassed = Ember.typeOf(maybeTooltipComponent) === 'instance';
    const component = componentWasPassed ? maybeTooltipComponent : Ember.Object.create({});
    const renderContext = componentWasPassed ? component : this;

    let content = this.get('tooltipContent');
    let tooltip, tooltipOptions;

    const keys = Object.keys(this);
    const hasTooltipContentProperty = (Ember.$.inArray('tooltipContent', keys) !== -1);

    if (componentWasPassed) {
      const componentContent = component.get('content');

      if (componentContent) {
        content = componentContent;
      } else {
        content = component.get('element').innerHTML;
      }
    }

    if (!content && !hasTooltipContentProperty) {
      return;
    }

    tooltipOptions = {
      content
    };

    this.get('tooltipSupportedProperties').forEach(function(property) {

      /* Ignore content because we dealt with it already */

      if (property === 'content') {
        return;
      }

      const capitalizedProperty = Ember.String.capitalize(property);

      tooltipOptions[property] = component.get(property) || this.get(`tooltip${capitalizedProperty}`);
    }, this);

    tooltip = renderTooltip(this.get('element'), tooltipOptions, renderContext);

    this.set('tooltip', tooltip);

    /* Bind observer if tooltipContent changes */

    this.addObserver('tooltipContent', this, this._tooltipContentDidChange);

    /* Bind observer if in manual-triggering mode */

    if (tooltipOptions.event === 'manual' || tooltipOptions.event === 'none') {
      if (componentWasPassed) {

        /* Keep track of child tooltip component */

        this.set('tooltipChildComponent', component);

        /* Turn 'tooltipVisibility' into a computed property, reading
        from child tooltip component's 'visibility' option */

        Ember.defineProperty(this, 'tooltipVisibility', Ember.computed.reads('tooltipChildComponent.visibility'));
      }

      this.addObserver('tooltipVisibility', this, this._tooltipVisibilityDidChange);
      this._tooltipVisibilityDidChange();
    }
  }),

  /**
  Updates the content value of the tooltip with value of 'tooltipContent'.

  @method _tooltipContentDidChange
  @private
  */

  _tooltipContentDidChange: function() {
    const tooltip = this.get('tooltip');

    if (tooltip) {
      tooltip.content(this.get('tooltipContent'));
    }
  },

  /**
  Opens or closes tooltip based on value of 'tooltipVisibility'.
  Only used when event is 'manual'.

  @method _tooltipVisibilityDidChange
  @private
  */

  _tooltipVisibilityDidChange: function() {
    const tooltip = this.get('tooltip');

    if (this.get('tooltipVisibility')) {
      tooltip.show();
    } else {
      tooltip.hide();
    }
  },

  /**
  Call this method on any component to attach tooltips to all elements in its
  template that have a `.tooltip` class. Tooltip options are set using
  data attributes.

  ```hbs
  {{!--app/templates/components/some-widget.hbs--}}
  <div
    class="has-tooltip"
    data-tooltip-content="This will show"
    data-tooltip-position="right"
    data-tooltip-effect-class="grow"
  >
    Hover over me!
  </div>
  ```

  ```js
  // app/components/some-widget.js

  export default Ember.Component.extend({

    renderTooltipsInTemplate: function() {
      this.renderTooltip();
    }.on('didInsertElement'),

  });
  ```

  Supported options are in the format data-tooltip-{$dasherizedProperty} where
  dasherizedProperty is each property, dasherized, in tooltipSupportedProperties.


  @method renderChildTooltips
  */

  renderChildTooltips: function() {
    const _this = this;
    const tooltipSupportedProperties = this.get('tooltipSupportedProperties');

    Ember.run.scheduleOnce('render', this, function() {
      const tooltipOptions = {};

      this.$().find('.has-tooltip').each(function() {
        const $element = Ember.$(this);

        tooltipSupportedProperties.forEach(function(property) {
          const capitalizedProperty = Ember.String.capitalize(property);
          const dasherizedProperty = Ember.String.dasherize(property);
          const value = $element.data(`tooltip-${dasherizedProperty}`);

          tooltipOptions[property] = value || _this.get(`tooltip${capitalizedProperty}`);
        }, this);

        renderTooltip(this, tooltipOptions);
      });
    });
  },

});
