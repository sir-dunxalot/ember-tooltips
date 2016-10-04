import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-component', 'Integration | Option | delayOnChange', {
  integration: true
});

test('It animates with a delay', function(assert) {
  const done = assert.async();

  assert.expect(2);

  /* Create two tooltips and show one */

  this.render(hbs`
    {{tooltip-on-component delay=300 delayOnChange=false class='test-tooltip'}}
    {{tooltip-on-component isShown=true delay=300 delayOnChange=false event='none'}}
  `);

  assert.equal(this.$().find('.test-tooltip').attr('aria-hidden'), 'true',
    'Tooltip should be hidden by default');

  /* We still need a small delay, but now we check the
  test tooltip is shown *almost* immediately after hover
  instead of after a 300ms delay */

  run(() => {
    this.$().trigger('mouseover');
  });

  run.later(() => {

    assert.equal(this.$().find('.test-tooltip').attr('aria-hidden'), 'false',
      'Tooltip should be shown immediately');

    done();
  }, 50);

});
