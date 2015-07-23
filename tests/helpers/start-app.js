import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

import andThenAfterRender from './async/and-then-after-render';
import assertTooltipProperties from './async/assert-tooltip-properties';
import mouseOut from './async/mouse-out';
import mouseOver from './async/mouse-over';
import inspect from './sync/inspect';

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
