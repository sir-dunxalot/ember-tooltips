import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, assertTooltipNotRendered, assertTooltipRendered } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tooltip-on-element', 'Integration | Helpers | getTooltipFromBody', {
  integration: true,
});

[assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
  test("each helperInstance's getTooltipFromBody throws error when $body is not provided", function(assert) {

    this.render(hbs`
      {{tooltip-on-element}}

      {{tooltip-on-element}}
    `);

    const $notBody = this.$();

    let funcToError = () => {
      helperInstance($notBody, assert);
    };

    assert.throws(funcToError, Error,
        'helperInstance without $body will throw an error');

  });
});


[assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
  test("each helperInstance's getTooltipFromBody throws error when no tooltip is found", function(assert) {

    this.render(hbs``);

    const $body = this.$().parents('body');

    let funcToError = () => {
      helperInstance($body, assert);
    };

    assert.throws(funcToError, Error,
        'helperInstance without a rendered tooltip will throw an Error');

  });
});

[assertTooltipRendered, assertTooltipNotVisible, assertTooltipVisible].forEach(function(helperInstance) {
  test("each helperInstance's getTooltipFromBody throws error when multiple tooltips are found", function(assert) {

    this.render(hbs`
      {{tooltip-on-element}}

      {{tooltip-on-element}}
    `);

    const $body = this.$().parents('body');

    let funcToError = () => {
      helperInstance($body, assert);
    };

    assert.throws(funcToError, Error,
        'helperInstance without multiple tooltips will throw an Error');

  });
});

test('getTooltipFromBody will not throw en error with assertTooltipNotRendered', function(assert) {

  this.render(hbs``);

  const $body = this.$().parents('body');

  assertTooltipNotRendered($body, assert);

});

