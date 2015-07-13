module Course
  class UserCoursesController < ApplicationController
    before_action :is_logged_in

    def new
      course = Course::CourseDatum.find(params[:id])
      if Course::UserCourse.where(user: current_user).and(course_course_datum: course).exists?
        render json: {'status': 'already exists'}, status: :unprocessable_entity
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

    def check_exercise
      data = JSON.parse request.body.read
      exercise = Course::Exercise.find(data['ID'])
      course = exercise.course_lesson.course_course_datum
      user_course = Course::UserCourse.find_by(course_course_datum: course)
      # TODO : Wywołanie zewnętrznego modułu zadaniowego i sprawdzenie poprawności wykonania data['code'] data['user_input']
      # Jeżeli output jest poprawny, zadanie rozwiązane
      id = exercise.id.to_s
      output = 'testowy output'
      json_response = { 'ID': id, 'output': output, 'is_correct': false }
      correct = true # FIXME : Sprawdzenie poprawności
      if correct
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
      render json: json_response.to_json
    end

    def check_quizzes
      data = JSON.parse request.body.read
      lesson = Course::Lesson.find(data['ID'])
      user_course = Course::UserCourse.find_by(user: current_user, course_course_datum: lesson.course_course_datum)
      id = lesson.id.to_s
      json_response = { 'ID': id, 'is_correct': false }
      correct = Course::CourseChecker.check_quizes lesson, data, json_response
      if correct
        unless user_course.quizzes.include? id
          user_course.quizzes << id
        end
        json_response['is_correct'] = true
        check_lesson user_course, lesson, json_response
        user_course.save!
      end
      render json: json_response.to_json
    end

    private

    # Przyznawanie achiementa
    def grant_achievement(json_response, user_course, id, id_type, lesson_achievement = false)
      query = Course::Achievement.where(id_type => id)
      json_response_key = 'achievement_granted'
      json_response_key = 'lesson_achievement_granted' if lesson_achievement
      if query.exists?
        # Przyznanie achievementa
        achievement = query.first
        if user_course.achievements.include? achievement.id.to_s
          json_response[json_response_key] = false
        else
          user_course.achievements << achievement.id.to_s
          json_response[json_response_key] = true
        end
      else
        json_response[json_response_key] = false
      end
    end

    # Sprawdzanie czy lekcja jest już zaliczona
    def check_lesson(user_course, lesson, json_reponse)
      correct = Course::CourseChecker.check_lesson lesson, user_course
      if correct
        unless user_course.lessons.include? lesson.id.to_s
          user_course.lessons << lesson.id.to_s
          grant_achievement json_reponse, user_course, lesson.id.to_s, :lesson_id, true
        end
      end
    end
  end
end