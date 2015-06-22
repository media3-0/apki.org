module ApplicationHelper
  require 'kramdown'

  def parse_markdown(text)
    Kramdown::Document.new(text).to_html
  end
end
