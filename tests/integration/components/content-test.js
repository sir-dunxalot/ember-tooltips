import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | content', {
  integration: true,
});

test('assertTooltipContent correctly matches expected tootltip content for inline tooltip', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element text='foo'}}`);

  assertTooltipContent(assert, {
    contentString: 'foo',
  });

});

test('assertTooltipContent correctly matches expected tootltip content for block tooltip', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#tooltip-on-element}}foo{{/tooltip-on-element}}`);

  assertTooltipContent(assert, {
    contentString: 'foo',
  });
});

test('assertTooltipContent correctly compares expected and discovered tooltip content of tooltip', function(assert) {

  assert.expect(2);

  this.render(hbs`{{tooltip-on-element text='foo'}}`);

  const stubbedAssert = {
    equal(arg1, arg2/* , msg */) {
      assert.equal(
        arg1,
        'foo',
        'Helper correctly finds actual content of tooltip'
      );

      assert.equal(
        arg2,
        'foo',
        'Helper correctly intends to compare to string we provide'
      );
    },
  };

  assertTooltipContent(stubbedAssert, {
    contentString: 'foo',
  });
});
