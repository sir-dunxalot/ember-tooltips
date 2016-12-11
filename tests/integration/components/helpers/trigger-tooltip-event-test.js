import { moduleForComponent, test } from 'ember-qunit';
import { triggerTooltipEvent } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Helpers | triggerTooltipEvent', {
  integration: true,
});

test('triggerTooltipEvent throws appropriate error', function(assert) {

  this.render(hbs``);

  let funcToError = () => {
    triggerTooltipEvent(this.$(), 'invalid event type');
  };

  assert.throws(funcToError, Error,
      'triggerTooltipEvent should throw an error with an invalid type');

});

