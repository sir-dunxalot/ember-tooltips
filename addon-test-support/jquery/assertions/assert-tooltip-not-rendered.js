import { findTooltip } from 'ember-tooltips/test-support/jquery';

export default function assertTooltipNotRendered(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector, options);

  assert.equal(
    $tooltip.length,
    0,
    'assertTooltipNotRendered(): the ember-tooltip should not be rendered'
  );
}
