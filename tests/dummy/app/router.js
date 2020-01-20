import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('acceptance');
  this.route('many-tooltips');
  this.route('update-for-reposition');
});

export default Router;
