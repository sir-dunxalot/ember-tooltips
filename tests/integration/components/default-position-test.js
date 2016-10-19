import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

function assertDefaultPositionWithSideTopOrBottom(assert, context, expectedDefaultPosition) {
  const $this = context.$();
  const targetPosition = $this.position();
  const targetWidth = $this.width();

  const tooltip = $this.find('.ember-tooltip');
  const tooltipPosition = tooltip.position();
  const tooltipWidth = tooltip.width();

  const targetCenterPosition = targetWidth/2 + targetPosition.left;
  const tooltipCenterPosition = tooltipWidth/2 + tooltipPosition.left;

  if (expectedDefaultPosition === 'right') {
    assert.ok(targetCenterPosition < tooltipCenterPosition,
      'Tooltip should be right of the target');
  } else if (expectedDefaultPosition === 'left') {
    assert.ok(targetCenterPosition > tooltipCenterPosition,
      'Tooltip should be left of the target');
  } else if (expectedDefaultPosition === 'bottom') {
    // should not be an acceptable value
    assert.ok(targetPosition.top < tooltipPosition.top,
      'Tooltip should be below the target');
  } else if (expectedDefaultPosition === 'top') {
    // should not be an acceptable value
    assert.ok(targetPosition.left > tooltipPosition.left,
      'Tooltip should be left of the target');
  }
}

function assertDefaultPositionWithSideLeftOrRight(assert, context, expectedDefaultPosition) {
  const $this = context.$();
  const targetPosition = $this.position();
  const targetHeight = $this.height();

  const tooltip = $this.find('.ember-tooltip');
  const tooltipPosition = tooltip.position();
  const tooltipHeight = tooltip.height();

  const targetCenterPosition = targetHeight/2 + targetPosition.top;
  const tooltipCenterPosition = tooltipHeight/2 + tooltipPosition.top;

  if (expectedDefaultPosition === 'top') {
    assert.ok(targetCenterPosition > tooltipCenterPosition,
      'Tooltip should be right of the target');
  } else if (expectedDefaultPosition === 'bottom') {
    assert.ok(targetCenterPosition < tooltipCenterPosition,
      'Tooltip should be left of the target');
  } else if (expectedDefaultPosition === 'left') {
    // should not be an acceptable value
    assert.ok(targetPosition.top < tooltipPosition.top,
      'Tooltip should be below the target');
  } else if (expectedDefaultPosition === 'right') {
    // should not be an acceptable value
    assert.ok(targetPosition.left > tooltipPosition.left,
      'Tooltip should be left of the target');
  }
}

moduleForComponent('tooltip-on-element', 'Integration | Option | defaultPosition', {
  integration: true
});

// we must use the tooltip with a block to give the tooltip a width and height

test('It shows with showOn top left', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='top' defaultPosition='left' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideTopOrBottom(assert, this, 'left');
});

test('It shows with showOn top right', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='top' defaultPosition='right' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideTopOrBottom(assert, this, 'right');
});

test('It shows with showOn bottom left', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='bottom' defaultPosition='left' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideTopOrBottom(assert, this, 'left');
});

test('It shows with showOn bottom right', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='bottom' defaultPosition='right' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideTopOrBottom(assert, this, 'right');
});

test('It shows with showOn left top', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='left' defaultPosition='top' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideLeftOrRight(assert, this, 'top');
});

test('It shows with showOn left bottom', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='left' defaultPosition='bottom' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideLeftOrRight(assert, this, 'bottom');
});

test('It shows with showOn right top', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='right' defaultPosition='top' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideLeftOrRight(assert, this, 'top');
});

test('It shows with showOn right bottom', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-component side='right' defaultPosition='bottom' keepInWindow=false}}
      template block text
    {{/tooltip-on-component}}
  `);

  assertDefaultPositionWithSideLeftOrRight(assert, this, 'bottom');
});
