import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSide } from 'dummy/tests/helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | side and keepInWindow', {
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

  this.render(hbs`{{ember-tooltip keepInWindow=false effect='none'}}`);

  assertTooltipSide(assert, { side: 'top' });

});

test('ember-tooltip shows on the top', function(assert) {

  assert.expect(1);

  this.render(hbs`{{ember-tooltip side='top' keepInWindow=false effect='none'}}`);

  assertTooltipSide(assert, { side: 'top' });

});

test('ember-tooltip shows with showOn right', function(assert) {

  assert.expect(1);

  this.render(hbs`{{ember-tooltip side='right' keepInWindow=false effect='none'}}`);

  assertTooltipSide(assert, { side: 'right' });

});

test('ember-tooltip shows with showOn bottom', function(assert) {

  assert.expect(1);

  this.render(hbs`{{ember-tooltip side='bottom' keepInWindow=false effect='none'}}`);

  assertTooltipSide(assert, { side: 'bottom' });

});

test('ember-tooltip shows with showOn left', function(assert) {

  assert.expect(1);

  this.render(hbs`{{ember-tooltip side='left' keepInWindow=false effect='none'}}`);

  assertTooltipSide(assert, { side: 'left' });

});

/* TODO(Unclaimed)

Figure out how to test keepInWindow reliably in PhantomJS

test('It stays in the window', function(assert) {

  assert.expect(1);

  this.render(hbs`
    {{#ember-tooltip side='left'}}
      This is some long text to push the tooltip off the page
    {{/ember-tooltip}}
  `);

   assertTooltipSide(assert, { side: 'right' });

});
*/
