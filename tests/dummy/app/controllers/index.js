import { action } from '@ember/object';
import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { cancel, later, scheduleOnce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class IndexController extends Controller {
  @tracked
  asyncContent = null;

  @tracked
  showTooltips = false;

  @tracked
  showToggleablePopover = false;

  @tracked
  showLogoTooltip = false;

  @action
  setAsyncContent() {
    return new RSVP.Promise((resolve) => {
      later(() => {
        this.asyncContent = 'Some model';
        resolve();
      }, 2000);
    });
  }

  @action
  togglePopover() {
    this.showToggleablePopover = !this.showToggleablePopover;
  }

  scheduleShowLogoTooltip = modifier(() => {
    let timer = null;
    // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
    scheduleOnce('afterRender', () => {
      timer = later(() => {
        this.showLogoTooltip = true;
      }, 1000);
    });
    return () => {
      cancel(timer);
    };
  });
}
