class UserController < ApplicationController

  before_filter :current_user, only: [ :edit_profile ]

  def profile
    @user = User.find(params[:id])
  end

  def edit_profile
    @user = current_user

    if params.include?(:user)
      #zatwierdzony formularz POST
      @user.update_attributes!(params[:user].permit(:profile_description))
      flash[:notice] = 'Zapisano'
    end
  end
end
