# name: layouts-site-info
# about: Site info widget for use with Discourse Layouts (based on layouts-custom-html)
# version: 0.1
# authors: David Newkerk

register_asset 'stylesheets/site-info.scss'

DiscourseEvent.on(:layouts_ready) do
  DiscourseLayouts::WidgetHelper.add_widget('site-info', position: 'right', order: '2')
end
