class ArticleCategoriesController < ApplicationController
  def index
    @category = ArticleCategory.find(params[:id])
    @articles = @category.articles.order_by(created_at: 'desc')#.page params[:page] FIXME : paginacja
  end

  def list
    @categories = ArticleCategory.all
  end
end



