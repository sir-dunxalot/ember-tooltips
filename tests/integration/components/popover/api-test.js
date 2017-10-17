import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  afterTooltipRenderChange,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
} from 'dummy/tests/helpers/ember-tooltips';

const { $ } = Ember;

moduleForComponent('ember-popover', 'Integration | Option | API', {
  integration: true,
});

test('Popover: click target, click hide-action', function(assert) {

  assert.expect(3);

  this.render(hbs`
    {{#ember-popover event='click' popoverHideDelay=0 as |popover|}}
      <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
    {{/ember-popover}}
  `);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'click');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    $('.hide-action').click();

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);
    }, 50);
  });
});

test('Popover: click target, click hide-action, click target', function(assert) {

  assert.expect(4);

  this.render(hbs`
    {{#ember-popover event='click' as |popover|}}
      <button class='hide-action' {{action 'hide' target=popover}}>Hide</button>
    {{/ember-popover}}
  `);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'click');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    $('.hide-action').click();

    afterTooltipRenderChange(assert, () => {
      assertTooltipNotVisible(assert);

      triggerTooltipTargetEvent(this.$(), 'click');

      afterTooltipRenderChange(assert, () => {
        assertTooltipVisible(assert);
      });
    }, 300);
  });
});

test('Popover: click target, click popover, click hide-action, click target', function(assert) {

  assert.expect(5);

  this.render(hbs`
    {{#ember-popover event='click' popoverHideDelay=0 as |popover|}}
      <span class='hide-action' {{action 'hide' target=popover}}>Hide</span>
    {{/ember-popover}}
  `);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'click');

  afterTooltipRenderChange(assert, () => {
    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'click', {
      selector: '.ember-popover',
    });

    afterTooltipRenderChange(assert, () => {
      assertTooltipVisible(assert);

      $('.hide-action').click();

      afterTooltipRenderChange(assert, () => {
        assertTooltipNotVisible(assert);

        triggerTooltipTargetEvent(this.$(), 'click');

        afterTooltipRenderChange(assert, () => {
          assertTooltipVisible(assert);
        });
      }, 50);
    });
  });
});
