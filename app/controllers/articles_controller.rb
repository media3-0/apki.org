class ArticlesController < ApplicationController
	def article
    @article = Article.order_by(created_at: 'desc').page params[:page]
  end

  def view_article
    @article = Article.find(params[:id])
  end
end
