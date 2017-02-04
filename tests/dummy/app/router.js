import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;
const AppRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

AppRouter.map(function() {
  this.route('acceptance');
});

export default AppRouter;
