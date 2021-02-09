import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { findTooltip } from 'ember-tooltips/test-support/dom';

export default function assertTooltipContent(qunitAssert, options = {}) {
  const { contentString, selector } = options;

  if (isNone(contentString)) {
    assert(
      'You must specify a contentString property in the options parameter'
    );
  }

  const tooltip = findTooltip(selector, options);

  if (!tooltip) {
    assert(
      `assertTooltipContent(): Could not find a tooltip for selector: ${selector}`
    );
  }

  const tooltipContent = tooltip.innerText.trim();

  qunitAssert.equal(
    tooltipContent,
    contentString,
    `Content of tooltip (${tooltipContent}) matched expected (${contentString})`
  );
}
