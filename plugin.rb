# name: layouts-site-info
# about: Site info widget for use with Discourse Layouts (based on layouts-custom-html)
# version: 0.2
# authors: David Newkerk

enabled_site_setting :layouts_site_info_enabled

register_asset 'stylesheets/site-info.scss'

DiscourseEvent.on(:layouts_ready) do
  DiscourseLayouts::WidgetHelper.add_widget('site-info', position: 'right', order: '2')
end
