class ArticleCategoriesController < ApplicationController
  def index
    @category = ArticleCategory.find(params[:id])
    @articles = @category.articles
  end
end



