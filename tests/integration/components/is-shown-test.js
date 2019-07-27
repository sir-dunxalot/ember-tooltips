import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import {
  find,
  render,
  settled,
  triggerEvent
} from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import {
  assertTooltipNotVisible,
  assertTooltipVisible
} from "ember-tooltips/test-support";

module("Integration | Option | isShown", function(hooks) {
  setupRenderingTest(hooks);

  test("ember-tooltip toggles with isShown", async function(assert) {
    assert.expect(3);

    this.set("showTooltip", true);

    await render(hbs`{{ember-tooltip isShown=showTooltip}}`);

    assertTooltipVisible(assert);

    this.set("showTooltip", false);

    await settled();

    assertTooltipNotVisible(assert);

    this.set("showTooltip", true);

    await settled();

    assertTooltipVisible(assert);
  });

  test("ember-popover toggles with isShown", async function(assert) {
    assert.expect(3);

    this.set("showTooltip", true);

    await render(hbs`{{ember-popover isShown=showTooltip}}`);

    assertTooltipVisible(assert);

    this.set("showTooltip", false);

    await settled();

    assertTooltipNotVisible(assert);

    this.set("showTooltip", true);

    await settled();

    assertTooltipVisible(assert);
  });

  test("ember-popover toggles with isShown even when mouse is inside popover", async function(assert) {
    assert.expect(3);

    this.set("showTooltip", true);

    await render(
      hbs`{{ember-popover isShown=showTooltip class="js-test-popover"}}`
    );

    assertTooltipVisible(assert);

    const popoverTarget = find(".js-test-popover");
    await triggerEvent(popoverTarget, "mouseenter");

    this.set("showTooltip", false);

    await settled();

    assertTooltipNotVisible(assert);

    this.set("showTooltip", true);

    await settled();

    assertTooltipVisible(assert);
  });
});
