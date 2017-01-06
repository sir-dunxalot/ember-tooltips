import TooltipOnElementComponent from 'ember-tooltips/components/tooltip-on-element';

export default TooltipOnElementComponent.extend({
  tetherComponentName: 'tether-tooltip-on-component',

  _shouldTargetGrandparentView: true,
});
