import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('tooltip-on-element', 'Integration | Option | updateFor', {
  integration: true,
});

test('updateFor test', function(assert) {

  assert.expect(2);

  this.set('asyncContent', null);

  this.on('setAsyncContent', () => {
    return new RSVP.Promise((resolve) => {
      run.later(() => {
        this.set('asyncContent', 'Some model');
        resolve();
      }, 100);
    });
  });

  this.render(hbs`
    {{#tooltip-on-element updateFor=asyncContent onRender='setAsyncContent'}}
      {{#if asyncContent}}
        {{asyncContent}}
      {{else}}
        ...
      {{/if}}
    {{/tooltip-on-element}}
  `);

  const done = assert.async();

  assertTooltipContent(assert, {
    contentString: '...',
  });

  run.later(() => {
    assertTooltipContent(assert, {
      contentString: 'Some model',
    });

    done();
  }, 200);

});
