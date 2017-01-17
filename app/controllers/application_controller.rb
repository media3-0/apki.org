class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: :json_request?

  rescue_from Exceptions::AccessDenied do |exception|
    redirection exception.message
  end
  rescue_from Exceptions::NotFound do |exception|
    redirection exception.message, :not_found
  end
  rescue_from Exceptions::ExpressionTypeNotRecognized do |exception|
    redirection exception.message
  end
  rescue_from Mongoid::Errors::DocumentNotFound do |exception|
    redirection 'Nie znaleziono takiego zasobu', :not_found, exception.message
  end

  helper_method :current_user

  protected

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    if ((!@current_user.nil?) && @current_user.is_admin?) && Rails.env.production?
      Rack::MiniProfiler.authorize_request
    end
    @current_user
  end

  private

  def is_logged_in
    redirection 'Musisz być zalogowany aby mieć tu dostęp' unless current_user
  end

  def is_teacher
    unless current_user.account_type == :teacher
      redirection 'Musisz być edukatorem aby mieć tu dostęp'
    end
  end

  def is_admin
    unless current_user.account_type == :admin
      redirection 'Musisz być adminem aby mieć tu dostęp'
    end
  end

  def redirection(message, status = :unauthorized, spec = nil)
    redirect_path = root_path
    redirect_path = request.referrer if request.referrer

    if json_request?
      result = { 'error' => message }
      result['error_message'] = spec unless Rails.env.production? || spec.nil?
      render json: result, status: status
      return
    end

    redirect_to redirect_path, flash: { error: message }
  end

  def json_request?
    request.format.json?
  end
end
