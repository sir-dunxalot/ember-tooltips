import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tooltip-as-component');
  this.route('tooltip-on-element');
  this.route('tooltip-on-helper');
});

export default Router;
