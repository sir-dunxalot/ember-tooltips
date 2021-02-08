import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipNotRendered(assert, options = {}) {
  const { selector } = options;
  const tooltip = findTooltip(selector, options);

  assert.notOk(
    tooltip,
    'assertTooltipNotRendered(): the ember-tooltip should not be rendered'
  );
}
