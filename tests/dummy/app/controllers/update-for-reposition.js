import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  rows: null,
  isLoading: true,

  init() {
    this._super(...arguments);
    set(this, 'rows', []);
  },

  actions: {
    fetchData() {
      setTimeout(() => {
        if (this.isDestroying) {
          return;
        }

        set(this, 'rows', [
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
        ]);
        set(this, 'isLoading', false);
      }, 1000);
    },

    deleteData() {
      set(this, 'isLoading', true);
      set(this, 'rows', []);
    },
  },
});
