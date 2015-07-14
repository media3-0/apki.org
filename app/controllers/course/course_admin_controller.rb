module Course
  class CourseAdminController < ApplicationController
    before_action :is_logged_in, except: [:index, :show] # TODO : Włączyć po testach
    before_action :is_admin, except: [:index, :show]  # TODO : Włączyć po testach
  end
end