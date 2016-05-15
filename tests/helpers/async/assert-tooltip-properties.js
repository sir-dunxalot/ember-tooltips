import Ember from 'ember';
import selectorFor from '../selector-for';

function cleanWhitespace(jQueryElement) {
  jQueryElement.contents().filter(function() {
    this.innerHTML = $.trim(this.innerText);

    return (this.nodeType === 3 && !/\S/.test(this.nodeValue));
  }).remove();

  return jQueryElement;
}

/* like click() but runs asyncrously allowing you to
use it outside of an andThen function with the same
stuff in the DOM */

export default Ember.Test.registerAsyncHelper('assertTooltipProperties',
  function(app, assert, name, properties = {}) {

    /* Default options */

    const expectedContent = properties.content || 'This is a tooltip';
    const expectedEffectClass = properties.effectClass || 'slide';
    const expectedEvent = properties.event || 'hover';
    const expectedPlace = properties.place || 'top';
    const expectedTypeClass = properties.typeClass || null;
    const typeOfContent = Ember.typeOf(expectedContent);
    const usingComponent = properties.usingComponent || false;

    /* Hover/click to attach the tooltip to the DOM */

    if (expectedEvent === 'click') {
      click(selectorFor(name));
    } else if (expectedEvent === 'hover') {
      mouseOver(name);
    } else if (expectedEvent === 'manual') {
      click(`${selectorFor(name)} + input[type="checkbox"]`);
    } else {
      triggerEvent(selectorFor(name), expectedEvent);
    }

    andThen(function() {
      const [ tooltip ] = Ember.$('.tooltip').toArray();
      const classNames = tooltip.className.split(/\s+/);
      const indexOfEffectClass = classNames.indexOf(expectedEffectClass);
      const indexOfTypeClass = classNames.indexOf(expectedTypeClass);

      assert.ok(!!tooltip,
        'The tooltip should be added to the DOM after triggering the show event on the target element');

      /* Check auto - NO TEST */

      /* Check content */

      if (usingComponent) {
        const [ tooltipHtml ] = cleanWhitespace($(tooltip)).toArray();
        const cleanTooltipHtml = tooltipHtml.innerHTML.replace(/id="[^"]*"/g, '').replace(/\s+/, ' ');
        const expectedTargetContent = properties.targetContent || 'Hover over me';
        const target = inspect(name, false);

        assert.equal($.trim(cleanTooltipHtml), expectedContent,
          'The HTML content of the tooltip should be correct');

        assert.equal(target.innerText, expectedTargetContent,
          'The expected target content should contain just the expected text and not the {{tooltip-on-parent}} view');

      } else if (typeOfContent === 'string') {

        assert.equal(tooltip.textContent, expectedContent,
          'The text content of the tooltip should be correct');

      } else if (typeOfContent === 'object') {

        assert.equal(tooltip.innerHTML, expectedContent,
          'The child node of the tooltip should be correct');

      } else {
        Ember.warn('No tooltip content was expected by a call to assertTooltipProperties');
      }

      /* Check effectClass */

      if (expectedEffectClass) {

        assert.ok(indexOfEffectClass > -1,
          `The effect class of the tooltip should be ${expectedEffectClass}`);

      } else {

        assert.ok(indexOfEffectClass === -1,
          `The type class of the tooltip should not contain ${expectedTypeClass}`);

      }

      /* Check event - NO TEST */

      /* Check place

      We check that place is in the class name, so we know the addon is
      consuming the option */

      assert.ok(tooltip.className.indexOf(expectedPlace) > -1,
        'The placement of the tooltip should be reflected in the tooltip class name');

      /* Check spacing - NO TEST */

      /* Check typeClass */

      if (expectedTypeClass) {

        assert.ok(indexOfTypeClass > -1,
          `The type class of the tooltip should be ${expectedTypeClass}`);

      } else {

        assert.ok(indexOfTypeClass === -1,
          `The type class of the tooltip should not contain ${expectedTypeClass}`);

      }

    });

    /* Unhover/click so the tooltip is detached from the DOM */

    //  if (name.match('auto-close')) do nothing

    if (expectedEvent === 'click') {
      click(selectorFor(name));
    } else if (expectedEvent === 'hover') {
      mouseOut(name);
    } else if (expectedEvent === 'manual') {
      click(`${selectorFor(name)} + input[type="checkbox"]`);
    }

    /* Then check it has been removed */

    andThen(function() {

      Ember.run.later(this, function() {

        assert.ok(!Ember.$('.tooltip').length,
          'There should not be a tooltip in the DOM after triggering the hide event on the target element');

      }, 200);

    });

  }
);
