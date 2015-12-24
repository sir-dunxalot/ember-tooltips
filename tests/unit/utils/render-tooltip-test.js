import renderTooltip from '../../../utils/render-tooltip';
import { module, test } from 'qunit';

module('Unit | Utility | render tooltip');

test('It returns a Tooltip object', function(assert) {
  const result = renderTooltip(document.createElement('div'), {
    content: 'test tooltip',
  });

  assert.equal(result.constructor, window.Tooltip,
    'The util should return the tooltip object created by new Tooltip');

});
