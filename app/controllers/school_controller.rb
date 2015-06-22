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

    @users = User.where(:id.ne => current_user.id)
    # TODO : przefiltrować tablicę (uczniowie którzy nie mają żadnej szkoły lub mają obecną)
    # @users.reject! { |user| user.school.id != @school.id if user.school != nil }

    if params.include?(:school)
      # zatwierdzony formularz POST
      params[:school][:user_ids] << current_user.id.to_s
      params[:school][:user_ids].reject! { |c| c.empty? }
      @school.update_attributes!(params[:school].permit(:name, :description, :user_ids => []))

      flash[:notice] = 'Zapisano'
    end
  end

  private
  def is_teacher
    current_user.account_type == :teacher
  end
end
