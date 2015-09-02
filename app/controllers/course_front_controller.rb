class CourseFrontController < ApplicationController
  before_action :is_logged_in, only: [:index]
  layout false, only: [:index]

  def index
  end
  def list
  end
end
