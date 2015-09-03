class MainController < ApplicationController
  def index
  end

  def news
    @news = News.order_by(created_at: 'desc').page params[:page]
  end

  def view_news
    @news = News.find(params[:id])
  end

  def test
  end

  def forms_test
  end

  def free_editor
  end
end
