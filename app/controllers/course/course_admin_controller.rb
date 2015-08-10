module Course
  class CourseAdminController < ApplicationController
    before_action :is_logged_in, except: [:index, :show]
    before_action :is_admin, except: [:index, :show]
  end
end
