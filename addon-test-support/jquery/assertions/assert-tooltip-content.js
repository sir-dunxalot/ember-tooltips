import { assert as emberAssert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { findTooltip } from 'ember-tooltips/test-support/jquery';

export default function assertTooltipContent(assert, options = {}) {
  const { contentString, selector } = options;

  if (isNone(contentString)) {
    emberAssert('You must specify a contentString property in the options parameter');
  }

  const $tooltip = findTooltip(selector, options);
  const tooltipContent = $tooltip.text().trim();

  assert.equal(tooltipContent, contentString,
    `Content of tooltip (${tooltipContent}) matched expected (${contentString})`);

}
