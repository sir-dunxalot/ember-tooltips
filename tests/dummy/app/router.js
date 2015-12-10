import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('destroy-on-transition');
  this.route('tooltip-as-component');
  this.route('tooltip-on-element');
  this.route('tooltip-on-helper');
  this.route('tooltip-manual-trigger');
  this.route('tooltip-auto-close');
  this.route('tooltip-with-safestring');
});

export default Router;
