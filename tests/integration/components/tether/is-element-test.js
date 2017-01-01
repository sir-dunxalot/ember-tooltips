import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  isElementInPopover,
  isElementInTargetAndNotInPopover,
  isElementElsewhere,
} from 'ember-tooltips/components/tether-popover-on-element';

let $elsewhere;
let $parentElsewhere;
let $popover;
let $popoverInterior;
let $target;
let $targetInterior;

moduleForComponent('tether-popover-on-element', 'Integration | Utility | isElement', {
  integration: true,

  beforeEach() {
    this.render(hbs`
      <div class="parent-elsewhere">
        <div class="target">
          <div class="target-interior"></div>
          {{#tether-popover-on-element}}
            <div class="popover-interior"></div>
          {{/tether-popover-on-element}}
        </div>
        <div class="elsewhere"></div>
      </div>
    `);

    $target = this.$('.target');
    $targetInterior = this.$('.target-interior');
    $popover = this.$('.ember-popover');
    $popoverInterior = this.$('.popover-interior');
    $elsewhere = this.$('.elsewhere');
    $parentElsewhere = this.$('.parent-elsewhere');
  },
});

test('Popover: isElementInPopover', function(assert) {

  assert.expect(6);

  assert.notOk(isElementInPopover($target, $popover));

  assert.notOk(isElementInPopover($targetInterior, $popover));

  assert.ok(isElementInPopover($popover, $popover));

  assert.ok(isElementInPopover($popoverInterior, $popover));

  assert.notOk(isElementInPopover($elsewhere, $popover));

  assert.notOk(isElementInPopover($parentElsewhere, $popover));

});

test('Popover: isElementInTargetAndNotInPopover', function(assert) {

  assert.expect(6);

  assert.ok(isElementInTargetAndNotInPopover($target, $target, $popover));

  assert.ok(isElementInTargetAndNotInPopover($targetInterior, $target, $popover));

  assert.notOk(isElementInTargetAndNotInPopover($popover, $target, $popover));

  assert.notOk(isElementInTargetAndNotInPopover($popoverInterior, $target, $popover));

  assert.notOk(isElementInTargetAndNotInPopover($elsewhere, $target, $popover));

  assert.notOk(isElementInTargetAndNotInPopover($parentElsewhere, $target, $popover));

});

test('Popover: isElementElsewhere', function(assert) {

  assert.expect(6);

  assert.notOk(isElementElsewhere($target, $target, $popover));

  assert.notOk(isElementElsewhere($targetInterior, $target, $popover));

  assert.notOk(isElementElsewhere($popover, $target, $popover));

  assert.notOk(isElementElsewhere($popoverInterior, $target, $popover));

  assert.ok(isElementElsewhere($elsewhere, $target, $popover));

  assert.ok(isElementElsewhere($parentElsewhere, $target, $popover));

});

