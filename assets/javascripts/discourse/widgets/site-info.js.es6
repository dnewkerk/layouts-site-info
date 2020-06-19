import { scheduleOnce } from "@ember/runloop";
import { createWidget } from "discourse/widgets/widget";

let layouts;
try {
  layouts = requirejs("discourse/plugins/discourse-layouts/discourse/lib/layouts");
} catch(error) {
  layouts = { createLayoutsWidget: createWidget };
  console.error(error);
}

export default layouts.createLayoutsWidget("site-info", {
  tagName: "div.site-info.widget-container.border-box",
  buildKey: () => "site-info",

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
        html += "<div class='copyright'>";
        html += `&copy; ${year} ${this.siteSettings.title}. All rights reserved.`;
        html += "</div>";
      }

      scheduleOnce("afterRender", this, function() {
        $("div.site-info").append(`<div class="contents">${html}</div>`);
      });
      state.renderScheduled = true;
    }
    return "";
  }
});
