import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipVisible(assert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector);
  const ariaHidden = tooltip.getAttribute('aria-hidden');

  assert.ok(ariaHidden === 'false',
    `assertTooltipVisible(): the ember-tooltip should be visible:
      aria-hidden = ${ariaHidden}`);
}
