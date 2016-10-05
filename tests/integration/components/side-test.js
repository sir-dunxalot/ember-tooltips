import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

function assertPosition(assert, context, expectedSide) {
  const $this = context.$();
  const targetPosition = $this.position();
  const tooltipPosition = $this.find('.ember-tooltip').position();

  if (expectedSide === 'top') {
    assert.ok(targetPosition.top > tooltipPosition.top,
      'Tooltip should be above the target');
  } else if (expectedSide === 'right') {
    assert.ok(targetPosition.left < tooltipPosition.left,
      'Tooltip should be right of the target');
  } else if (expectedSide === 'bottom') {
    assert.ok(targetPosition.top < tooltipPosition.top,
      'Tooltip should be below the target');
  } else if (expectedSide === 'left') {
    assert.ok(targetPosition.left > tooltipPosition.left,
      'Tooltip should be left of the target');
  }
}

moduleForComponent('tooltip-on-element', 'Integration | Option | side and keepInWindow', {
  integration: true
});

/* Test the positions without forcing the tooltip
to stay in the window. */

test('It shows with showOn top', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='top' keepInWindow=false}}`);

  assertPosition(assert, this, 'top');

});

test('It shows with showOn right', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='right' keepInWindow=false}}`);

  assertPosition(assert, this, 'right');

});

test('It shows with showOn bottom', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='bottom' keepInWindow=false}}`);

  assertPosition(assert, this, 'bottom');

});

test('It shows with showOn left', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='left' keepInWindow=false}}`);

  assertPosition(assert, this, 'left');

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

//   assertPosition(assert, this, 'right');

// });
