import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { $ } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Config | body-element-id', {
  integration: true,
});

test('Tooltip is rendered on rootElement not body', function(assert) {

  assert.expect(2);

  this.render(hbs`{{tooltip-on-element}}`);

  const $tooltip = $(document.body).find('.ember-tooltip');
  const $tooltipParent = $tooltip.parent();
  const tooltipParentId = $tooltipParent.attr('id');

  assert.notEqual($tooltipParent.attr('tagname'), 'body',
    'The tooltip should not be a child of the document body');

  assert.equal(tooltipParentId, 'ember-testing',
    'The tooltip should be a child of the #ember-testing rootElement');

});
