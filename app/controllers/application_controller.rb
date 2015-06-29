class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]['$oid']) if session[:user_id]
  end

  def is_logged_in
    unless current_user
      redirection 'Musisz być zalogowanym aby mieć tu dostęp'
    end
  end

  def is_teacher
    is_logged_in
    unless current_user.account_type == :teacher
      redirection 'Musisz być edukatorem aby mieć tu dostęp'
    end
  end

  def is_admin
    is_logged_in
    unless current_user.account_type == :admin
      redirection 'Musisz być adminem aby mieć tu dostęp'
    end
  end

  def redirection(message)
    redirect_path = root_path
    if request.referrer
      redirect_path = request.referrer
    end

    redirect_to redirect_path, flash: { error: message}
  end
end
