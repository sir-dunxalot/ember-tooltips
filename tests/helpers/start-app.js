import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

const { merge, run } = Ember;

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  let application;

  attributes = merge(attributes, attrs); // Use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
