import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent } from '../../helpers/ember-tooltips';

const { run } = Ember;

moduleForComponent('ember-tooltip', 'Integration | Option | delayOnChange', {
  integration: true,
});

test('ember-tooltip animates with a delay', function(assert) {

  assert.expect(2);

  /* Create two tooltips and show one */

  this.render(hbs`
    {{ember-tooltip delay=300 delayOnChange=false class='test-tooltip'}}
    {{ember-tooltip isShown=true delay=300 delayOnChange=false event='none'}}
  `);

  const done = assert.async();

  assertTooltipNotVisible(assert, { selector: '.test-tooltip' });

  /* We still need a small delay, but now we check the
  test tooltip is shown *almost* immediately after hover
  instead of after a 300ms delay */

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  run.later(() => {
    assertTooltipVisible(assert, { selector: '.test-tooltip' });

    done();
  }, 50);

});
