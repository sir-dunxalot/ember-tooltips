import { findTooltip } from 'ember-tooltips/test-support/jquery';

export default function assertTooltipNotVisible(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector, options);
  const ariaHidden = $tooltip.attr('aria-hidden');

  assert.ok(
    ariaHidden === 'true',
    `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible:
      aria-hidden = ${ariaHidden}`
  );
}
