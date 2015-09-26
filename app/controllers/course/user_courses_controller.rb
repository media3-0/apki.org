module Course
  class UserCoursesController < ApplicationController
    before_action :is_logged_in

    def new
      course = Course::CourseDatum.find(params[:id])
      if Course::UserCourse.where(user: current_user).and(course_course_datum: course).exists?
        render json: { 'status' => 'already exists' }, status: :unprocessable_entity
        return
      end
      user_course = Course::UserCourse.new
      current_user.course_user_courses << user_course
      user_course.course_course_datum = course
      if user_course.save
        render json: { 'status' => 'ok', 'id' => user_course.id.to_s }
      else
        render json: user_course.errors, status: :unprocessable_entity
      end
    end

    def check_exercise
      data = JSON.parse request.body.read
      exercise = Course::Exercise.find(data['id'])
      course = exercise.course_lesson.course_course_datum
      user_course = Course::UserCourse.find_by(course_course_datum: course, user: current_user)
      id = exercise.id.to_s
      output = {}
      json_response = { 'id' => id, 'output' => output, 'is_correct' => false }
      if Course::CourseChecker.check_excercise exercise, data, json_response, output
        Course::CourseChecker.correct_exercise id, data, output, exercise.course_lesson, user_course, json_response
      end
      render json: json_response.to_json
    end

    def check_quizzes
      data = JSON.parse request.body.read
      lesson = Course::Lesson.find(data['id'])
      user_course = Course::UserCourse.find_by(user: current_user, course_course_datum: lesson.course_course_datum)
      id = lesson.id.to_s
      json_response = { 'id' => id, 'is_correct' => false }
      if Course::CourseChecker.check_quizes lesson, data, json_response
        Course::CourseChecker.correct_quizzes id, lesson, user_course, json_response
      end
      render json: json_response.to_json
    end

    def is_lesson_finished
      lesson = Course::Lesson.find(params[:id])
      user_course = Course::UserCourse.find_by(user: current_user, course_course_datum: lesson.course_course_datum)
      json_response = { 'id' => lesson.id.to_s, 'lesson_finished' => false }
      if Course::CourseChecker.check_lesson user_course, lesson, json_response
        json_response['lesson_finished'] = true
      end
      render json: json_response.to_json
    end
  end
end
