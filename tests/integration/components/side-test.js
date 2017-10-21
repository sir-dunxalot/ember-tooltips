import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipSide,
} from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | side', {
  integration: true,
});

/* Test the positions without forcing the tooltip
to stay in the window.

It's necessary to use effect='none' because the `effect` class causes
spacing to be incorrect. The default 'fade' effect moves about `10px`
closer to the target prior to the tooltip being animated when the
tooltip is shown.
*/

test('ember-tooltip shows on the top by default', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#some-component}}Hello{{ember-tooltip isShown=true text='Hi'}}{{/some-component}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, { side: 'top' });
  });
});

test('ember-tooltip shows on the top', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#some-component}}Hello{{ember-tooltip side='top' isShown=true text='Hi'}}{{/some-component}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, { side: 'top' });
  });
});

test('ember-tooltip shows on the right', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#some-component}}Hello{{ember-tooltip side='right' isShown=true text='Hi'}}{{/some-component}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, { side: 'right' });
  });
});

test('ember-tooltip shows on the bottom', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#some-component}}Hello{{ember-tooltip side='bottom' isShown=true text='Hi'}}{{/some-component}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, { side: 'bottom' });
  });
});

test('ember-tooltip shows on the left', function(assert) {

  assert.expect(1);

  this.render(hbs`{{#some-component}}Hello{{ember-tooltip side='left' isShown=true text='Hi'}}{{/some-component}}`);

  afterTooltipRenderChange(assert, () => {
    assertTooltipSide(assert, { side: 'left' });
  });
});
