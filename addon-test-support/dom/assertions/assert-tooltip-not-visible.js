import { assert } from '@ember/debug';
import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipNotVisible(qunitAssert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector, options);

  if (!tooltip) {
    assert(
      `assertTooltipVisible(): Could not find a tooltip for selector: ${selector}`
    );
  }

  const ariaHidden = tooltip.getAttribute('aria-hidden');

  qunitAssert.ok(
    ariaHidden === 'true',
    `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible:
      aria-hidden = ${ariaHidden}`
  );
}
