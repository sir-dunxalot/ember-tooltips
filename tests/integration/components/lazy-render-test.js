import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerTooltipTargetEvent, assertTooltipRendered, assertTooltipNotRendered, assertTooltipNotVisible } from '../../helpers/ember-tooltips';

const { run } = Ember;

moduleForComponent('ember-tooltip', 'Integration | Component | enableLazyRendering', {
  integration: true,
});

[
  {
    eventType: 'hover',
    showOn: 'mouseenter',
  }, {
    eventType: 'click',
    showOn: 'click',
  }, {
    eventType: 'focus',
    showOn: 'focusin',
  },
].forEach(function(eventObject) {
  test(`ember-tooltip renders lazily after ${eventObject.showOn} when enableLazyRendering=true`, function(assert) {

    this.set('eventType', eventObject.eventType);

    this.render(hbs`{{ember-tooltip event=eventType enableLazyRendering=true}}`);

    assertTooltipNotRendered(assert);

    triggerTooltipTargetEvent(this.$(), eventObject.showOn);

    assertTooltipRendered(assert);

  });
});

test('ember-tooltip renders automatically when enableLazyRendering=false', function(assert) {

  this.render(hbs`{{ember-tooltip enableLazyRendering=false}}`);

  assertTooltipRendered(assert);

});

test('ember-tooltip renders automatically when isShown=true', function(assert) {

  this.render(hbs`{{ember-tooltip enableLazyRendering=true isShown=true}}`);

  assertTooltipRendered(assert);

});

test('ember-tooltip renders automatically when tooltipIsVisible=true', function(assert) {

  this.render(hbs`{{ember-tooltip enableLazyRendering=true tooltipIsVisible=true}}`);

  assertTooltipRendered(assert);

});

test('ember-tooltip event=click will only trigger one click event', function(assert) {

  assert.expect(3);

  let timesClicked = 0;

  this.render(hbs`{{ember-tooltip event="click" enableLazyRendering=true}}`);

  const $tooltipTarget = this.$();
  const done = assert.async();

  $tooltipTarget.on('click', () => {
    timesClicked++;
  });

  assert.equal(timesClicked, 0,
      'timesClicked should be zero before the click event');

  triggerTooltipTargetEvent($tooltipTarget, 'click');

  assert.equal(timesClicked, 1,
      'timesClicked should be one after the click event');

  run.later(() => {
    assert.equal(timesClicked, 1,
        'timesClicked should still be one after any async actions are completed');

    done();
  }, 100);

});

test('ember-tooltip behaves when a mouseenter/mouseleave occurs quickly', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-tooltip enableLazyRendering=true}}`);

  const $tooltipTarget = this.$();

  assertTooltipNotRendered(assert);

  run(() => {

    /* We intentionally use $tooltipTarget.trigger
    instead of triggerTooltipTargetEvent because mouseenter
    and mouseleave need to happen within the same run loop.
    This mimics the interaction when a user quickly hovers
    through the $tooltipTarget
    */

    $tooltipTarget.trigger('mouseenter');
    $tooltipTarget.trigger('mouseleave');
  });

  assertTooltipRendered(assert);

  assertTooltipNotVisible(assert);

});
