import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Component | target', {
  integration: true,
});

test('ember-tooltip target test', function(assert) {

  this.render(hbs`
    <div id="some-target"></div>
    {{ember-tooltip target="#some-target"}}
  `);

  const $someTarget = this.$().find('#some-target');

  assert.ok($someTarget.hasClass('ember-tooltip-or-popover-target'),
      '#some-target should be the tooltip target');

});
