class ArticlesController < ApplicationController
  def view_article
    @article = Article.find(params[:id])
  end
end
