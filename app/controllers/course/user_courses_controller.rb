module Course
  class UserCoursesController < ApplicationController
    before_action :is_logged_in

    def new
      course = Course::CourseDatum.find(params[:course_id])
      if Course::UserCourse.where(user: current_user).and(course_course_datum: course).exists?
        render json: { 'status': 'already exists' }, status: :unprocessable_entity
        return
      end
      user_course = Course::UserCourse.new
      current_user.course_user_courses << user_course
      user_course.course_course_datum = course
      if user_course.save
        render json: {'status': 'ok', 'id': user_course.id.to_s}
      else
        render json: user_course.errors, status: :unprocessable_entity
      end
    end
  end
end