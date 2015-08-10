class SchoolController < ApplicationController
  before_action :is_logged_in, only: [:edit_profile, :educator_news]
  before_action :is_teacher, only: [:edit_profile, :educator_news]

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
      editing_profile
    end
  end

  def educator_news
    if params.include?(:educator_news)
      existing_news_model
    else
      news_form
    end
  end

  def view_news
    @news = EducatorNews.find(params[:id])
  end

  def all_news
    @news = EducatorNews.order_by(created_at: 'desc').page params[:page]
  end

  private

  def editing_profile
    params[:school][:student_ids].reject!(&:empty?) # wyczyść puste pola
    if @school.update_attributes(params[:school].permit(:name, :description, student_ids: []))
      @school.user = current_user
      @school.save!
      flash[:notice] = 'Zapisano'
    else
      flash[:error] = 'Błąd podczas zapisu'
    end
  end

  def existing_news_model
    if params[:educator_news][:id]
      edit_news
    else
      new_news
    end
  end

  def edit_news
    # Edycja newsu
    @educator_news = EducatorNews.find(params[:educator_news][:id])
    unless @educator_news.user.eql?(current_user)
      fail Exceptions::AccessDenied.new('Ten news nie należy do Ciebie')
    end
    if @educator_news.update_attributes(params[:educator_news].permit(:title, :content))
      flash[:notice] = 'Zaktualizowano news'
      redirect_to school_view_news_path(@educator_news)
    end
    flash[:error] = 'Błąd podczas zapisu'
  end

  def new_news
    # Nowy news
    params[:educator_news][:user_id] = current_user.id.to_s
    @educator_news = EducatorNews.new(params[:educator_news].permit(:title, :content, :user_id))
    if @educator_news.save
      flash[:notice] = 'Stworzono nowy news'
      redirect_to school_view_news_path(@educator_news)
    end
    flash[:error] = 'Błąd podczas zapisu'
  end

  def news_form
    if params.include?(:id)
      @educator_news = EducatorNews.find(params[:id])
      unless @educator_news.user.eql?(current_user)
        fail Exceptions::AccessDenied.new('Ten news nie należy do Ciebie')
      end
      @news_id = params[:id]
    else
      @educator_news = EducatorNews.new
    end
  end
end
