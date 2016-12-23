import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | content ryanlabouve', {
  integration: true
});

test('assertContent correctly matches expected content', function(assert) {

  assert.expect(1);

  this.render(hbs`
    <div>
      :)
      {{tooltip-on-element text='Smiley face'}}
    </div>
  `);

  assertContent(assert, 'Smiley face');
});

test('assertContent correctly compares expected and discovered content of tooltip', function(assert) {

  assert.expect(2);

  this.render(hbs`
    <div>
      :)
      {{tooltip-on-element text='Smiley face'}}
    </div>
  `);

  const stubbedAssert = {
    equal(arg1, arg2/*, msg*/) {
      assert.equal(
        arg1,
        'Smiley face',
        'Helper correctly finds actual content of tooltip'
      );

      assert.equal(
        arg2,
        'Frowning face',
        'Helper correctly intends to compare to string we provide'
      );
    }
  };

  assertContent(stubbedAssert, 'Frowning face');
});
