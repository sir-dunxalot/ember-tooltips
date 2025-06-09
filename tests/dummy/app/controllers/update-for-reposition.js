import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UpdateForRepositionController extends Controller {
  @tracked
  rows = [];

  @tracked
  isLoading = true;

  @action
  fetchData() {
    setTimeout(() => {
      if (this.isDestroying) {
        return;
      }

      this.rows = [
        {
          text: 'random text',
          number: 1,
        },
        {
          text: 'random text',
          number: 2,
        },
        {
          text: 'random text',
          number: 3,
        },
      ];
      this.isLoading = false;
    }, 1000);
  }

  @action
  deleteData() {
    if (!this.isLoading) {
      this.isLoading = true;
    }
    this.rows = [];
  }
}
