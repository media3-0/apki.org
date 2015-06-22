class MainController < ApplicationController
  def index
  end

  def news
    @news = News.order_by(created_at: 'desc').page params[:page]
  end
  def test
  end
end
