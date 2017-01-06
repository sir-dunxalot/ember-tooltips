import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | content', {
  integration: true,
});

test('assertTooltipContent correctly matches expected tootltip content', function(assert) {

  assert.expect(2);

  this.render(hbs`
    <div>
      :)
      {{tooltip-on-element text='Smiley face'}}
    </div>
  `);

  assertTooltipContent(assert, {
    contentString: 'Smiley face',
  });

  this.render(hbs`
    <div>
      :(
      {{#tooltip-on-element}}
        Frowning face
      {{/tooltip-on-element}}
    </div>
  `);

  assertTooltipContent(assert, {
    contentString: 'Frowning face',
  });
});

test('assertTooltipContent correctly compares expected and discovered tooltip content of tooltip', function(assert) {

  assert.expect(2);

  this.render(hbs`
    <div>
      :)
      {{tooltip-on-element text='Smiley face'}}
    </div>
  `);

  const stubbedAssert = {
    equal(arg1, arg2/* , msg */) {
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
    },
  };

  assertTooltipContent(stubbedAssert, {
    contentString: 'Frowning face',
  });
});
