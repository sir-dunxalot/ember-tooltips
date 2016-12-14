import { moduleForComponent, test } from 'ember-qunit';
import { triggerTooltipEvent } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | target', {
  integration: true
});

test('tooltip-on-element target test', function(assert) {

  this.render(hbs`
    <div id="some-target"></div>
    {{tooltip-on-element target='#some-target'}}
  `);

  triggerTooltipEvent(this.$(), 'mouseenter');

  const $someTarget = this.$().find('#some-target');

  assert.ok($someTarget.hasClass('ember-tooltip-or-popover-target'),
      '#some-target should be the tooltip target');

});
