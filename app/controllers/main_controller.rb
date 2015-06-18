class MainController < ApplicationController
  def index
    @user = current_user if current_user
  end

  def news
    @news = News.order_by(created_at: 'desc').page params[:page]
  end
end
