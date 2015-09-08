class UserController < ApplicationController
  before_action :is_logged_in, only: [:edit_profile]

  def profile
    @user = User.find(params[:id])
    @forum = Discourse.instance.get_user @user.nickname
  end

  def edit_profile
    @user = current_user
    @schools = School.all

    if params.include?(:user)
      # zatwierdzony formularz POST
      if @user.update_attributes(params[:user].permit(:profile_description, :school_id))
        flash[:notice] = 'Zapisano'
      else
        flash[:error] = 'Błąd podczas zapisu'
      end
    end
  end
end
