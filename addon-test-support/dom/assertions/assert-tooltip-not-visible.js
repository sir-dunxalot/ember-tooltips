import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipNotVisible(assert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector);
  const ariaHidden = tooltip.getAttribute('aria-hidden');

  assert.ok(ariaHidden === 'true',
    `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible:
      aria-hidden = ${ariaHidden}`);
}
