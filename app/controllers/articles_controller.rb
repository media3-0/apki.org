class ArticlesController < ApplicationController
  def view_article
    @article = Article.find(params[:id])
  end

  def all_articles
    @articles = Article.all.page params[:page]
  end
end
