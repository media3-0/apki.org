class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    if User.where(provider: auth['provider'], uid: auth['uid']).exists?
      user = User.find_by(provider: auth['provider'], uid: auth['uid'])
    else
      user = User.create_with_omniauth(auth)
    end
    session[:user_id] = user.id
    redirect_to root_url, :notice => 'Zalogowano!'
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => 'Wylogowano!'
  end
end
