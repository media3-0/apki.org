class SchoolController < ApplicationController
  before_action :is_logged_in, only: [:edit_profile, :educator_news, :accept_application, :educator_news_list]
  before_action :is_teacher, only: [:edit_profile, :educator_news, :accept_application, :educator_news_list]

  def profile
    @school = School.find(params[:id])
  end

  def edit_profile
    @school = current_user.klasa
    unless @school
      # tworzenie nowej szkoły
      @school = School.new
    end

    @students = User.where(school: @school, school_accepted: true).all
    @applications = User.where(school: @school, school_accepted: false).all

    if params.include?(:school)
      # zatwierdzony formularz POST
      editing_profile
    end
  end

  def educator_news
    if params.include?(:news)
      existing_news_model
    else
      news_form
    end
  end

  def educator_news_list
    @news = current_user.news
  end

  def accept_application
    user = User.find(params[:user][:id])
    accepted = params.key? :accepted
    if accepted
      user.school_accepted = true
    else
      user.school_accepted = false
      user.school = nil
    end
    if user.save
      flash[:notice] = 'Zapisano'
    else
      flash[:error] = 'Błąd podczas zapisu'
    end
    redirect_to school_edit_profile_path
  end

  private

  def editing_profile
    if @school.update_attributes(params[:school].permit(:name, :description))
      @school.user = current_user
      @school.save!
      flash[:notice] = 'Zapisano'
    else
      flash[:error] = 'Błąd podczas zapisu'
    end
  end

  def existing_news_model
    if params[:news][:id]
      edit_news
    else
      new_news
    end
  end

  def edit_news
    # Edycja newsu
    @news = News.find(params[:news][:id])
    unless @news.user.eql?(current_user)
      fail Exceptions::AccessDenied.new('Ten news nie należy do Ciebie')
    end
    if @news.update_attributes(params[:news].permit(:title, :content, :image))
      flash[:notice] = 'Zaktualizowano news'
      redirect_to view_news_path(@news)
    end
    flash[:error] = 'Błąd podczas zapisu'
  end

  def new_news
    # Nowy news
    params[:news][:user_id] = current_user.id.to_s
    @news = News.new(params[:news].permit(:title, :content, :image, :user_id))
    @news.educator_news = true
    if @news.save
      flash[:notice] = 'Stworzono nowy news'
      redirect_to view_news_path(@news)
    end
    flash[:error] = 'Błąd podczas zapisu'
  end

  def news_form
    if params.include?(:id)
      @news = News.find(params[:id])
      unless @news.user.eql?(current_user)
        fail Exceptions::AccessDenied.new('Ten news nie należy do Ciebie')
      end
      @news_id = params[:id]
    else
      @news = News.new
    end
  end
end
