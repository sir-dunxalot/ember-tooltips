import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { findTooltip } from 'ember-tooltips/test-support/jquery';

export default function assertTooltipContent(qunitAssert, options = {}) {
  const { contentString, selector } = options;

  if (isNone(contentString)) {
    assert(
      'You must specify a contentString property in the options parameter'
    );
  }

  const $tooltip = findTooltip(selector, options);
  const tooltipContent = $tooltip.text().trim();

  qunitAssert.equal(
    tooltipContent,
    contentString,
    `Content of tooltip (${tooltipContent}) matched expected (${contentString})`
  );
}
