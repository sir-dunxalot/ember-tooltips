import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('tooltip-on-element', 'Integration | Option | actions', {
  integration: true
});


// I'm not sure updateFor is necessary....
test('updateFor test', function(assert) {

  assert.expect(2);

  this.set('asyncContent', null);

  this.on('setAsyncContent', () => {
    return new Ember.RSVP.Promise((resolve) => {
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
  const $tooltip = this.$();


  assert.equal($tooltip.text().trim(), '...',
    'Should render ...');

  run.later(() => {
    assert.equal($tooltip.text().trim(), 'Some model',
      'Should render "Some model"');
    done();
  }, 200);

});
