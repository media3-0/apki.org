class SchoolController < ApplicationController
  before_action :is_logged_in, only: [ :edit_profile, :educator_news ]
  before_action :is_teacher, only: [ :edit_profile, :educator_news ]

  def profile
    @school = School.find(params[:id])
  end

  def edit_profile
    @school = current_user.klasa
    unless @school
      # tworzenie nowej szkoły
      @school = School.new
    end

    @users = @school.get_proper_user_list

    if params.include?(:school)
      # zatwierdzony formularz POST
      params[:school][:student_ids].reject! { |c| c.empty? } # wyczyść puste pola
      if @school.update_attributes(params[:school].permit(:name, :description, :student_ids => []))
        @school.user = current_user
        @school.save!
        flash[:notice] = 'Zapisano'
      else
        flash[:error] = 'Błąd podczas zapisu'
      end
    end
  end

  def educator_news
    if params.include?(:educator_news)
      if params[:educator_news][:id]
        # Edycja newsu
        @educator_news = EducatorNews.find(params[:educator_news][:id])
        unless @educator_news.user.eql?(current_user)
          raise Exceptions::AccessDenied.new('Ten news nie należy do Ciebie')
        end
        @educator_news.update_attributes!(params[:educator_news].permit(:title, :content))
        flash[:notice] = 'Zaktualizowano news'
        redirect_to school_view_news_path(@educator_news)
      else
        # Nowy news
        params[:educator_news][:user_id] = current_user.id.to_s
        @educator_news = EducatorNews.create!(params[:educator_news].permit(:title, :content, :user_id))
        flash[:notice] = 'Stworzono nowy news'
        redirect_to school_view_news_path(@educator_news)
      end
    else
      if params.include?(:id)
        @educator_news = EducatorNews.find(params[:id])
        @news_id = params[:id]
      else
        @educator_news = EducatorNews.new
      end
    end
  end

  def view_news
    @news = EducatorNews.find(params[:id])
  end

  def all_news
    @news = EducatorNews.order_by(created_at: 'desc').page params[:page]
  end
end
