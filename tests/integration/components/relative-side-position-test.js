import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertRelativeSidePosition } from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('tooltip-on-component', 'Integration | Option | relativeSidePosition', {
  integration: true,
});

test('It shows with showOn top left', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='top' relativeSidePosition='left' keepInWindow=false effect='none'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'left' });
});

test('It shows with showOn top right', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='top' relativeSidePosition='right' keepInWindow=false effect='none'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'right' });

});

test('It shows with showOn bottom left', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='bottom' relativeSidePosition='left'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'left' });
});

test('It shows with showOn bottom right', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='bottom' relativeSidePosition='right'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'right' });
});

test('It shows with showOn left top', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='left' relativeSidePosition='top'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'top' });
});

test('It shows with showOn left bottom', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='left' relativeSidePosition='bottom'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'bottom' });
});

test('It shows with showOn right top', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='right' relativeSidePosition='top'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'top' });
});

test('It shows with showOn right bottom', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#some-component class='target-component'}}
      {{#tooltip-on-component side='right' relativeSidePosition='bottom'}}
        template block text
      {{/tooltip-on-component}}
    {{/some-component}}
  `);

  assertRelativeSidePosition(assert, { relativeSidePosition: 'bottom' });
});
