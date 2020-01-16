import { createWidget } from 'discourse/widgets/widget';

export default createWidget('site-info', {
  tagName: 'div.site-info.widget-container.border-box',
  buildKey: () => 'site-info',

  defaultState() {
    return {
      renderScheduled: false
    };
  },

  html(attrs, state) {
    if (!state.renderScheduled) {
      let html = this.siteSettings.layouts_site_info;

      if (this.siteSettings.layouts_site_info_copyright) {
        const year = new Date().getFullYear();
        html += '<div class="copyright">';
        html += `&copy; ${year} ${this.siteSettings.title}. All rights reserved.`;
        html += '</div>';
      }

      Ember.run.scheduleOnce('afterRender', this, function() {
        $("div.site-info").append(`<div class='contents'>${html}</div>`);
      });
      state.renderScheduled = true;
    }
    return '';
  }
});
