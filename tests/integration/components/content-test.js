import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { assertTooltipContent } from 'ember-tooltips/test-support/dom/assertions';

module('Integration | Option | content', function (hooks) {
  setupRenderingTest(hooks);

  test('assertTooltipContent correctly matches expected tootltip content for inline tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`{{ember-tooltip text='foo' isShown=true}}`);

    assertTooltipContent(assert, {
      contentString: 'foo',
    });
  });

  test('assertTooltipContent correctly matches expected tootltip content for block tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{#ember-tooltip isShown=true}}
        foo
      {{/ember-tooltip}}
    `);

    assertTooltipContent(assert, {
      contentString: 'foo',
    });
  });

  test('assertTooltipContent correctly compares expected and discovered tooltip content of tooltip', async function (assert) {
    assert.expect(2);

    await render(hbs`{{ember-tooltip text='foo' isShown=true}}`);

    const stubbedAssert = {
      equal(arg1, arg2 /* , msg */) {
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

  test('assertTooltipContent supports passing a selector to target a specific tooltip', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{ember-tooltip class='some-garbage-tooltip' text='foo' isShown=true}}
      {{ember-tooltip class='the-best-tooltip' text='bar' isShown=true}}
    `);

    assertTooltipContent(assert, {
      contentString: 'bar',
      selector: '.the-best-tooltip',
    });
  });
});
