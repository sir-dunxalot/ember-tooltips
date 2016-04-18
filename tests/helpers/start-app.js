import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

import './async/and-then-after-render';
import './async/assert-tooltip-properties';
import './async/mouse-out';
import './async/mouse-over';
import './sync/inspect';

const assign = Ember.assign || Ember.merge;

export default function startApp(attrs) {
  let application;

  let attributes = assign({}, config.APP);
  attributes = assign(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
