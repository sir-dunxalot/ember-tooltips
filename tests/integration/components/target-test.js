import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Component | tooltip on element', {
  integration: true
});

test('tooltip target test', function(assert) {

  this.render(hbs`
    <div id="some-target"></div>
    {{tooltip-on-element target="#some-target"}}
  `);

  const $someTarget = this.$().find('#some-target');

  assert.ok($someTarget.hasClass('ember-tooltip-or-popover-target'),
      '#some-target should be the tooltip target');

});
