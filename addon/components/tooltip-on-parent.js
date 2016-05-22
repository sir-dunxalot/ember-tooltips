import Ember from 'ember';
import layout from '../templates/components/tooltip-on-parent';

const { computed, run, get } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  layout,

  style: computed(function() {
    return Ember.String.htmlSafe('display:none;');
  }),

  init(...args) {
    this._super(args);

    run.schedule('afterRender', () => {
      const parentView = this.get('parentView');

      if (!parentView) {
        console.warn('No parentView found');
      } else if (parentView.renderTooltip) {
        //Need to show for calculation correct position in Tooltip
        this.get('element').style.display = 'block';
        parentView.renderTooltip(this);
      } else {
        console.warn('No renderTooltip method found on the parent view of the {{tooltip-on-parent}} component');
      }

      //For change observering we should delete component. We should move it to tooltip.
      //Tooltip can take the element of this component as content
      //this.remove();
    });
  }
});
