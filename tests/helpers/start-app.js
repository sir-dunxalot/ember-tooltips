import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

import './async/and-then-after-render';
import './async/assert-tooltip-properties';
import './async/mouse-out';
import './async/mouse-over';
import './sync/inspect';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
