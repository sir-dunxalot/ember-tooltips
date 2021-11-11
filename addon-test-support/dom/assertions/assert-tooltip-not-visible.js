import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipNotVisible(assert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector, options);

  if (tooltip) {
    const ariaHidden = tooltip.getAttribute('aria-hidden');

    assert.ok(
      ariaHidden === 'true',
      `assertTooltipNotVisible(): the ember-tooltip should be visible:
        aria-hidden = ${ariaHidden}`
    );
  } else {
    assert.ok(
      false,
      `assertTooltipNotVisible(): Could not find a tooltip${
        selector ? ` for selector: ${selector}` : ''
      }`
    );
  }
}
