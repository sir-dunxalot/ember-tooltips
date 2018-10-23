import { findTooltip } from 'ember-tooltips/test-support';

export default function assertTooltipVisible(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector);
  const ariaHidden = $tooltip.attr('aria-hidden');

  assert.ok(ariaHidden === 'false',
    `assertTooltipVisible(): the ember-tooltip should be visible:
      aria-hidden = ${ariaHidden}`);
}
