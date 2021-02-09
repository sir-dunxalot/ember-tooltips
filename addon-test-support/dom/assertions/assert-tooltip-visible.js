import { assert } from '@ember/debug';
import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipVisible(qunitAssert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector, options);

  if (!tooltip) {
    assert(
      `assertTooltipVisible(): Could not find a tooltip for selector: ${selector}`
    );
  }

  const ariaHidden = tooltip.getAttribute('aria-hidden');

  qunitAssert.ok(
    ariaHidden === 'false',
    `assertTooltipVisible(): the ember-tooltip should be visible:
      aria-hidden = ${ariaHidden}`
  );
}
