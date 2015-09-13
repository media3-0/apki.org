class ArticleCategoriesController < ApplicationController

  
	def index
         @category = ArticleCategory.find_by(slug: params[:name])
         @articles = @category.articles
    end

    
end



