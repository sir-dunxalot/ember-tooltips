import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

function assertPosition(assert, context, expectedSide) {
  const $this = context.$();
  const targetPosition = $this.position();
  const tooltipPosition = $this.find('.ember-popover').position();

  if (expectedSide === 'top') {
    assert.ok(targetPosition.top > tooltipPosition.top,
      'Popover should be above the target');
  } else if (expectedSide === 'right') {
    assert.ok(targetPosition.left < tooltipPosition.left,
      'Popover should be right of the target');
  } else if (expectedSide === 'bottom') {
    assert.ok(targetPosition.top < tooltipPosition.top,
      'Popover should be below the target');
  } else if (expectedSide === 'left') {
    assert.ok(targetPosition.left > tooltipPosition.left,
      'Popover should be left of the target');
  }
}

moduleForComponent('popover-on-element', 'Integration | Option | side and keepInWindow', {
  integration: true
});

test('Popover shows with showOn', function(assert) {

  // assert.expect(4);

  /* Test the positions without forcing the tooltip
  to stay in the window. */

  this.render(hbs`{{popover-on-element side='top' keepInWindow=false}}`);

  assertPosition(assert, this, 'top');

  this.render(hbs`{{popover-on-element side='right' keepInWindow=false}}`);

  assertPosition(assert, this, 'right');

  this.render(hbs`{{popover-on-element side='bottom' keepInWindow=false}}`);

  assertPosition(assert, this, 'bottom');

  this.render(hbs`{{popover-on-element side='left' keepInWindow=false}}`);

  assertPosition(assert, this, 'left');

});
