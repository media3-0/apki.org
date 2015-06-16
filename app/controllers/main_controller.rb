class MainController < ApplicationController
  def index
    if current_user
      @user = current_user
    end
  end
end
