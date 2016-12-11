import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerTooltipEvent, assertTooltipRendered, assertTooltipNotRendered, assertTooltipNotVisible } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Component | enableLazyRendering', {
  integration: true
});

[
  {eventType: 'hover', showOn: 'mouseenter'},
  {eventType: 'click', showOn: 'click'},
  {eventType: 'focus', showOn: 'focusin'},
].forEach(function(eventObject) {
  test(`tooltip-on-element renders lazily after ${eventObject.showOn} when enableLazyRendering defaults to true`, function(assert) {

    this.set('eventType', eventObject.eventType);

    this.render(hbs`{{tooltip-on-element event=eventType}}`);

    const $body = this.$().parents('body');

    assertTooltipNotRendered($body, assert);

    triggerTooltipEvent(this.$(), eventObject.showOn);

    assertTooltipRendered($body, assert);

  });
});

test('tooltip-on-element renders when enableLazyRendering=false', function(assert) {

  this.render(hbs`{{tooltip-on-element enableLazyRendering=false}}`);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test('tooltip-on-element renders automatically when isShown=true', function(assert) {

  this.render(hbs`{{tooltip-on-element isShown=true}}`);

  const $body = this.$().parents('body');

  assertTooltipRendered($body, assert);

});

test('tooltip-on-element event=click will only trigger one click event', function(assert) {

  assert.expect(3);

  let timesClicked = 0;

  this.render(hbs`{{tooltip-on-element event="click"}}`);

  const $tooltipTarget = this.$();
  const done = assert.async();

  $tooltipTarget.on('click', () => {
    timesClicked++;
  });

  assert.equal(timesClicked, 0,
      'timesClicked should be zero before the click event');

  triggerTooltipEvent($tooltipTarget, 'click');

  assert.equal(timesClicked, 1,
      'timesClicked should be one after the click event');

  Ember.run.later(() => {
    assert.equal(timesClicked, 1,
        'timesClicked should still be one after any async actions are completed');

    done();
  }, 100);

});

test('tooltip-on-element behaves when a mouseenter/mouseleave occurs quickly', function(assert) {

  assert.expect(3);

  this.render(hbs`{{tooltip-on-element}}`);

  const $tooltipTarget = this.$();
  const $body = this.$().parents('body');

  assertTooltipNotRendered($body, assert);

  Ember.run(() => {
    // we intentionally use $tooltipTarget.trigger instead of
    // triggerTooltipEvent because mouseenter and mouseleave need
    // to happen within the same run loop. This mimics the
    // interaction when a user quickly hovers through the $target
    $tooltipTarget.trigger('mouseenter');
    $tooltipTarget.trigger('mouseleave');
  });

  assertTooltipRendered($body, assert);

  assertTooltipNotVisible($body, assert);

});
