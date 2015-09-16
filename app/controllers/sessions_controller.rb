class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    if User.where(provider: auth['provider'], uid: auth['uid']).exists?
      user = User.find_by(provider: auth['provider'], uid: auth['uid'])
    else
      user = User.create_with_omniauth(auth)
    end
    session[:user_id] = user.id.to_s
    redirect_to root_url, notice: 'Zalogowano!'
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: 'Wylogowano!'
  end

  # Logowanie tylko do testów
  def test_login
    unless Rails.env.production?
      if params.key? :user_id
        session[:user_id] = params[:user_id]
      else
        user = User.find_by(uid: 'test')
        session[:user_id] = user.id.to_s
      end
      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Zalogowano!' }
        format.json { render json: { 'notice' => 'Zalogowano!' } }
      end
    end
  end
end
