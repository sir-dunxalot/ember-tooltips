import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  RSVP,
  run,
} = Ember;

import { assertTooltipContent } from '../../helpers/ember-tooltips';

moduleForComponent('ember-tooltip', 'Integration | Option | updateFor', {
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
    {{#ember-tooltip updateFor=asyncContent onRender='setAsyncContent'}}
      {{#if asyncContent}}
        {{asyncContent}}
      {{else}}
        ...
      {{/if}}
    {{/ember-tooltip}}
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
