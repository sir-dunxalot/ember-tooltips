import { findTooltip } from 'ember-tooltips/test-support/jquery';

export default function assertTooltipRendered(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector, options);

  assert.equal(
    $tooltip.length,
    1,
    'assertTooltipRendered(): the ember-tooltip should be rendered'
  );
}
