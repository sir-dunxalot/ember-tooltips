import { moduleForComponent, test } from 'ember-qunit';
import { triggerTooltipTargetEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-tooltip', 'Integration | Helpers | triggerTooltipTargetEvent', {
  integration: true,
});

test('triggerTooltipTargetEvent throws appropriate error', function(assert) {

  this.render(hbs``);

  let funcToError = () => {
    triggerTooltipTargetEvent(this.$(), 'invalid event type');
  };

  assert.throws(funcToError, Error,
      'triggerTooltipTargetEvent should throw an error with an invalid type');

});

