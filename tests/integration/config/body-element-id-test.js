import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Config | body-element-id', {
  integration: true,
});

test('Tooltip is rendered on rootElement not body', function(assert) {

  assert.expect(1);

  this.render(hbs`{{tooltip-on-element}}`);

  const $tooltip = $(document.body).find('.ember-tooltip');
  const tooltipParentId = $tooltip.parent().attr('id');

  assert.equal(tooltipParentId, 'ember-testing',
    'The tooltip should be a child of the #ember-testing rootElement, not the document body');

});
