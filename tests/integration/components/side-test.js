import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSide } from '../../tests/helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | side and keepInWindow', {
  integration: true
});

/* Test the positions without forcing the tooltip
to stay in the window. */

test('tooltip-on-element shows', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='top' keepInWindow=false}}`);

  assertTooltipSide(assert, 'top');

});

test('tooltip-on-element shows with showOn right', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='right' keepInWindow=false}}`);

  assertTooltipSide(assert, 'right');

});

test('tooltip-on-element shows with showOn bottom', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='bottom' keepInWindow=false}}`);

  assertTooltipSide(assert, 'bottom');

});

test('tooltip-on-element shows with showOn left', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='left' keepInWindow=false}}`);

  assertTooltipSide(assert, 'left');

});

/* TODO - figure out how to test keepInWindow reliably in PhantomJS  */

// test('It stays in the window', function(assert) {

//   assert.expect(1);

//   /* Test the position switches form left to right automatically. */

//   this.render(hbs`
//     {{#tooltip-on-element side='left'}}
//       This is some long text to push the tooltip off the page
//     {{/tooltip-on-element}}
//   `);

//    assertPosition(assert, this, 'right');

// });
