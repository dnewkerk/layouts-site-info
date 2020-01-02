import { createWidget } from 'discourse/widgets/widget';

export default createWidget('site-info', {
  tagName: 'div.site-info.widget-container',
  buildKey: () => 'site-info',

  defaultState() {
    return {
      renderScheduled: false
    };
  },

  html(attrs, state) {
    if (!state.renderScheduled) {
      let html = this.siteSettings.layouts_site_info;

      const category = attrs.category;
      if (category && category.layouts_site_info) {
        html = category.layouts_site_info;
      }

      Ember.run.scheduleOnce('afterRender', this, function() {
        $("div.site-info").append(`<div class='contents'>${html}</div>`);
      });
      state.renderScheduled = true;
    }
    return '';
  }
});
