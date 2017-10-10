import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipContent,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | content', {
  integration: true,
});

test('assertTooltipContent correctly matches expected tootltip content for inline tooltip', function(assert) {
  const done2 = assert.async();

  assert.expect(1);

  this.render(hbs`{{ember-tooltip text='foo' isShown=true}}`);

  afterTooltipRenderChange(assert, () => {
    console.log('rendered');
    assertTooltipContent(assert, {
      contentString: 'foo',
    });

    done2();
  });

});

test('assertTooltipContent correctly matches expected tootltip content for block tooltip', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#ember-tooltip isShown=true}}foo{{/ember-tooltip}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipContent(assert, {
      contentString: 'foo',
    });
  });
});

test('assertTooltipContent correctly compares expected and discovered tooltip content of tooltip', function(assert) {

  assert.expect(2);

  this.render(hbs`{{ember-tooltip text='foo'}}`);

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
