import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | delayOnChange', {
  integration: true
});

test('tooltip-on-element animates with a delay', function(assert) {

  assert.expect(2);

  /* Create two tooltips and show one */

  this.render(hbs`
    {{tooltip-on-element delay=300 delayOnChange=false class='test-tooltip'}}
    {{tooltip-on-element isShown=true delay=300 delayOnChange=false event='none'}}
  `);

  const done = assert.async();

  assertTooltipNotVisible(assert, {selector: '.test-tooltip'});

  /* We still need a small delay, but now we check the
  test tooltip is shown *almost* immediately after hover
  instead of after a 300ms delay */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  run.later(() => {
    assertTooltipVisible(assert, {selector: '.test-tooltip'});

    done();
  }, 50);

});
