import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSide } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | side and keepInWindow', {
  integration: true,
});

/* Test the positions without forcing the tooltip
to stay in the window. */

test('tooltip-on-element shows on the top by default', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element keepInWindow=false}}`);

  assertTooltipSide(assert, { side: 'top' });

});

test('tooltip-on-element shows on the top', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='top' keepInWindow=false}}`);

  assertTooltipSide(assert, { side: 'top' });

});

test('tooltip-on-element shows with showOn right', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='right' keepInWindow=false}}`);

  assertTooltipSide(assert, { side: 'right' });

});

test('tooltip-on-element shows with showOn bottom', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='bottom' keepInWindow=false}}`);

  assertTooltipSide(assert, { side: 'bottom' });

});

test('tooltip-on-element shows with showOn left', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element side='left' keepInWindow=false}}`);

  assertTooltipSide(assert, { side: 'left' });

});

/* TODO(Unclaimed)

Figure out how to test keepInWindow reliably in PhantomJS

test('It stays in the window', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#tooltip-on-element side='left'}}
      This is some long text to push the tooltip off the page
    {{/tooltip-on-element}}
  `);

   assertTooltipSide(assert, { side: 'right' });

});
*/
