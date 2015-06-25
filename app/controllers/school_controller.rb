class SchoolController < ApplicationController
  before_filter :current_user, only: [ :edit_profile ]
  before_filter :is_teacher, only: [ :edit_profile ]

  def profile
    @school = School.find(params[:id])
  end

  def edit_profile
    @school = current_user.school
    unless @school
      # tworzenie nowej szkoły
      @school = School.new
    end

    @users = @school.get_proper_user_list(current_user.id)

    if params.include?(:school)
      # zatwierdzony formularz POST
      params[:school][:user_ids] << current_user.id.to_s # dodaj obecnego użytkownika do listy użytkowników
      params[:school][:user_ids].reject! { |c| c.empty? } # wyczyść puste pola
      if @school.update_attributes(params[:school].permit(:name, :description, :user_ids => []))
        flash[:notice] = 'Zapisano'
      else
        flash[:error] = 'Błąd podczas zapisu'
      end
    end
  end

  private
  def is_teacher
    current_user.account_type == :teacher
  end
end
