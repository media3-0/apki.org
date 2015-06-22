class UserController < ApplicationController

  before_filter :is_logged_in, only: [ 'edit_profile']

  def profile
  end

  def edit_profile
    @user = current_user

    if params.include?(:user)
      #zatwierdzony formularz POST
      @user.update_attributes!(params[:user].permit(:profile_description))
      flash[:notice] = 'Zapisano'
    end
  end

  private
  def is_logged_in
    current_user
  end
end
