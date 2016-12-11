import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import {
	assertTooltipNotRendered,
	assertTooltipRendered,
	assertTooltipNotVisible,
	triggerTooltipEvent,
	assertTooltipVisible
} from '../../tests/helpers/ember-tooltips';

moduleForAcceptance('Acceptance | acceptance');

test('all acceptance tests', function(assert) {
  visit('/acceptance');

  const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';


  andThen(() => {
    assert.equal(Ember.$(tooltipOrPopoverSelector).length, 2,
        'initially there should only be 2 tooltips or popovers rendered');
  });


  andThen(() => {

    assert.ok(true, '-------------- begin section 1 --------------');

    const $tooltipTarget = Ember.$('.js-test-tooltip-target-enableLazyRendering-false');
    const $body = Ember.$('body');
    const options = {
    	selector: '.js-test-tooltip-enableLazyRendering-false'
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipRendered($body, assert, options);

    assertTooltipNotVisible($body, assert, options);

    triggerTooltipEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible($body, assert, options);

  });


  andThen(() => {

    assert.ok(true, '-------------- begin section 2 --------------');

    const $tooltipTarget = Ember.$('.js-test-tooltip-target-enableLazyRendering-true');
    const $body = Ember.$('body');
    const options = {
      selector: '.js-test-tooltip-enableLazyRendering-true'
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered($body, assert, options);

    triggerTooltipEvent($tooltipTarget, 'mouseenter');

    assertTooltipRendered($body, assert, options);

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible($body, assert, options);

  });


  andThen(() => {

    assert.ok(true, '-------------- begin section 3 --------------');

    const $popoverTarget = Ember.$('.js-test-popover-target-enableLazyRendering-false');
    const $body = Ember.$('body');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-false'
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipRendered($body, assert, options);

    assertTooltipNotVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseleave');

    Ember.run.later(() => {
      assertTooltipNotVisible($body, assert, options);
    }, 300); //default hideDelay = 250

  });


  andThen(() => {

    assert.ok(true, '-------------- begin section 4 --------------');

    const $popoverTarget = Ember.$('.js-test-popover-target-enableLazyRendering-true');
    const $body = Ember.$('body');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-true'
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseleave');

    Ember.run.later(() => {
      assertTooltipNotVisible($body, assert, options);
    }, 300); //default hideDelay = 250

  });


  andThen(() => {

    assert.ok(true, '-------------- begin section 5 --------------');

    const $popoverTarget = Ember.$('.js-test-popover-target-enableLazyRendering-true-no-delay');
    const $body = Ember.$('body');
    const options = {
      selector: '.js-test-popover-enableLazyRendering-true-no-delay'
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible($body, assert, options);

    triggerTooltipEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible($body, assert, options);

  });


  andThen(() => {
    assert.equal(Ember.$(tooltipOrPopoverSelector).length, 5,
        'initially there should only be 2 tooltips or popovers rendered');
  });

});
