module Course
  class UserCoursesController < ApplicationController
    before_action :is_logged_in

    def new
      course = Course::CourseDatum.find(params[:id])
      if Course::UserCourse.where(user: current_user).and(course_course_datum: course).exists?
        render json: {'status' => 'already exists'}, status: :unprocessable_entity
        return
      end
      user_course = Course::UserCourse.new
      current_user.course_user_courses << user_course
      user_course.course_course_datum = course
      if user_course.save
        render json: {'status' => 'ok', 'id' => user_course.id.to_s}
      else
        render json: user_course.errors, status: :unprocessable_entity
      end
    end

    def check_exercise
      data = JSON.parse request.body.read
      exercise = Course::Exercise.find(data['id'])
      course = exercise.course_lesson.course_course_datum
      user_course = Course::UserCourse.find_by(course_course_datum: course)
      id = exercise.id.to_s
      output = {}
      json_response = {'id' => id, 'output' => output, 'is_correct' => false}
      if Course::CourseChecker.check_excercise exercise, data, json_response, output
        correct_exercise id, data, output, exercise.course_lesson, user_course, json_response
      end
      render json: json_response.to_json
    end

    def check_quizzes
      data = JSON.parse request.body.read
      lesson = Course::Lesson.find(data['id'])
      user_course = Course::UserCourse.find_by(user: current_user, course_course_datum: lesson.course_course_datum)
      id = lesson.id.to_s
      json_response = {'id' => id, 'is_correct' => false}
      if Course::CourseChecker.check_quizes lesson, data, json_response
        correct_quizzes id, lesson, user_course, json_response
      end
      render json: json_response.to_json
    end

    def is_lesson_finished
      lesson = Course::Lesson.find(params[:id])
      user_course = Course::UserCourse.find_by(user: current_user, course_course_datum: lesson.course_course_datum)
      json_response = {'id' => lesson.id.to_s, 'lesson_finished' => false}
      if check_lesson user_course, lesson, json_response
        json_response['lesson_finished'] = true
      end
      render json: json_response.to_json
    end

    private

    # TODO : wyrzucić do biblioteki

    # Przyznawanie achiementa
    def grant_achievement(json_response, user_course, id, id_type, lesson_achievement = false)
      query = Course::Achievement.where(id_type => id)
      json_response_key = 'achievement_granted'
      json_response_key = 'lesson_achievement_granted' if lesson_achievement
      if query.exists?
        # Przyznanie achievementa
        achievement = query.first
        if user_course.achievements.include? achievement.id.to_s
          json_response[json_response_key] = nil
        else
          user_course.achievements << achievement.id.to_s
          user_course.save!
          json_response[json_response_key] = achievement.to_json
        end
      else
        json_response[json_response_key] = nil
      end
    end

    def check_lesson(user_course, lesson, json_reponse)
      if Course::CourseChecker.check_lesson lesson, user_course
        unless user_course.lessons.include? lesson.id.to_s
          user_course.lessons << lesson.id.to_s
          grant_achievement json_reponse, user_course, lesson.id.to_s, :lesson_id, true
        end
        true
      else
        false
      end
    end

    def correct_exercise(id, data, output, lesson, user_course, json_response)
      unless user_course.exercises.has_key? id
        user_course.exercises[id] = {}
      end
      user_course.exercises[id]['code'] = data['code']
      user_course.exercises[id]['user_input'] = data['user_input']
      user_course.exercises[id]['output'] = output

      json_response['is_correct'] = true

      grant_achievement json_response, user_course, id, :exercise_id
      check_lesson user_course, lesson, json_response
      user_course.save!
    end

    def correct_quizzes(id, lesson, user_course, json_response)
      unless user_course.quizzes.include? id
        user_course.quizzes << id
      end
      json_response['is_correct'] = true
      check_lesson user_course, lesson, json_response
      user_course.save!
    end
  end
end
