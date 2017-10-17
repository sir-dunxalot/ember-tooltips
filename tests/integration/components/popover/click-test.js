import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
} from 'dummy/tests/helpers/ember-tooltips';

const { $ } = Ember;

moduleForComponent('ember-popover', 'Integration | Option | click', {
  integration: true,
});

test('Popover: click target, click target', function(assert) {

  assert.expect(3);

  this.render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'click');

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 50);
  });

});

test('Popover: click target, click popover, click target', function(assert) {

  assert.expect(4);

  this.render(hbs`{{ember-popover event='click' popoverHideDelay=0}}`);

  const $popoverTarget = this.$();

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.ember-popover' });

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      triggerTooltipTargetEvent($popoverTarget, 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      }, 50);
    }, 50);
  });

});

test('Popover: click target, click elsewhere', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{ember-popover event='click' popoverHideDelay=0}}
      </div>
    </div>
  `);

  assertTooltipNotRendered(assert);

  $('.target').click();

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    $('.elsewhere').click();

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 50);
  }, 50);
});

test('Popover: click target, click popover, click elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{ember-popover event='click' popoverHideDelay=0}}
      </div>
    </div>
  `);

  assertTooltipNotRendered(assert);

  $('.target').click();

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    /* Mimic user's cursor entering popover and clicking it */

    triggerTooltipTargetEvent(this.$(), 'mouseenter', {
      selector: '.ember-popover',
    });

    $('.ember-popover').click();

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      /* Mimic user's cursor leaving popover and clicking away from it */

      triggerTooltipTargetEvent(this.$(), 'mouseleave', {
        selector: '.ember-popover',
      });

      $('.elsewhere').click();

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);
      }, 50);
    }, 50);
  }, 50);
});

test('Popover: click target-interior, click target-interior', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <p class='target-interior'></p>
    {{ember-popover event='click' popoverHideDelay=0}}
  `);

  assertTooltipNotRendered(assert);

  $('.target-interior').click();

  afterTooltipRenderChange(assert, () => {

    assertTooltipVisible(assert);

    $('.target-interior').click();

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 50);
  }, 50);
});

test('Popover: focusin/click input, click input', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <input id="some-input">
    {{ember-popover event='click' targetId='some-input' popoverHideDelay=0}}
  `);

  const $popoverTarget = this.$('#some-input');

  assertTooltipNotRendered(assert);

  /* We intentionally trigger a focusin and click on the $popoverTarget because
  when a user clicks an input both events occur in that order.
  We have fixed this with _isInProcessOfShowing and this test protects that. */

  triggerTooltipTargetEvent($popoverTarget, 'focusin');
  triggerTooltipTargetEvent($popoverTarget, 'click');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 50);
  }, 50);

});
