module Course
  class CourseChecker
    def self.validate_lesson(lesson, user_course)
      valid_lesson = true
      lesson.course_exercises.each { |exercise| valid_lesson = false unless user_course.exercises.key? exercise.id.to_s }
       valid_lesson = false unless user_course.quizzes.include? lesson.id.to_s
      valid_lesson
    end

    def self.check_quizes(lesson, data, json_response)
      json_response['quizzes'] = {}
      lesson_correct = true
      lesson.course_quizs.each do |quiz|
        lesson_correct = false unless check_quiz data, json_response, quiz
      end
      lesson_correct
    end

    def self.check_excercise(exercise, data, json_response, output)
      if Rails.env.test?
        conn = Faraday.new(url: Rails.configuration.x.compile_api_host) do |faraday|
          faraday.request :url_encoded
          faraday.adapter Faraday.default_adapter
        end
      else
        conn = Faraday.new(url: Rails.configuration.x.compile_api_host) do |faraday|
          faraday.request :url_encoded
          faraday.response :logger
          faraday.adapter Faraday.default_adapter
        end
      end

      code = ''
      code << exercise.data['code_before']
      code << data['code']
      code << exercise.data['code_after']

      response = conn.post do |req|
        req.url '/compile'
        req.headers['Content-Type'] = 'application/json'
        req.body = { lang: exercise.data['lang'], code: code, user_input: data['user_input'] }.to_json
      end

      output.merge! JSON.parse(response.body.to_s)
      json_response['output'] = output

      check_compiled_code data['code'], exercise.data['expected_result_expr'], output['output'], data['user_input']
    end

    private

    def self.check_quiz(data, json_response, quiz)
      correct = true
      unless data['quizzes'].key? quiz.id.to_s
        json_response['quizzes'][quiz.id.to_s] = false
        correct = false
      end
      answer = data['quizzes'][quiz.id.to_s]
      if quiz.data['answer_idx'] == answer
        json_response['quizzes'][quiz.id.to_s] = true
      else
        json_response['quizzes'][quiz.id.to_s] = false
        correct = false
      end
      correct
    end

    def self.check_compiled_code(code, expected_result_expr, output, user_input)
      return false if expected_result_expr.empty?
      type = expected_result_expr[0]
      expression = expected_result_expr[1..-1]

      case type
        when 'c' # Kod dentaku
          begin
            int_input = Integer(user_input)
            int_output = Integer(output)
          rescue ArgumentError
            return false
          end
          calculator = Dentaku::Calculator.new
          calculator.store(input: int_input)
          calculator.store(output: int_output)
          return calculator.evaluate(expression)
        when 'r' # regexp
          regexp = /#{expression.gsub('{user_input}', Regexp.escape(user_input)).gsub('{code}', Regexp.escape(code))}/
          return (regexp =~ output) != nil
        when 's' # simple (zwykły oczekiwany output)
          return expression == output
        else # Nie rozpoznano wyrażenia
          fail Exceptions::ExpressionTypeNotRecognized
      end
    end

    # Przyznawanie achiementa
    def self.grant_achievement(json_response, user_course, id, id_type, lesson_achievement = false)
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

    def self.check_lesson(user_course, lesson, json_reponse)
      if lesson.course_quizs.empty? && !user_course.quizzes.include?(lesson.id.to_s)
        user_course.quizzes << lesson.id.to_s
        user_course.save!
      end
      if validate_lesson lesson, user_course
        unless user_course.lessons.include? lesson.id.to_s
          user_course.lessons << lesson.id.to_s
          user_course.save!
          grant_achievement json_reponse, user_course, lesson.id.to_s, :lesson_id, true
        end
        true
      else
        false
      end
    end

    def self.correct_exercise(id, data, output, lesson, user_course, json_response)
      user_course.exercises[id] = {} unless user_course.exercises.key? id
      user_course.exercises[id]['code'] = data['code']
      user_course.exercises[id]['user_input'] = data['user_input']
      user_course.exercises[id]['output'] = output

      json_response['is_correct'] = true

      grant_achievement json_response, user_course, id, :exercise_id
      check_lesson user_course, lesson, json_response
      user_course.save!
    end

    def self.correct_quizzes(id, lesson, user_course, json_response)
      user_course.quizzes << id unless user_course.quizzes.include? id
      json_response['is_correct'] = true
      check_lesson user_course, lesson, json_response
      user_course.save!
    end
  end
end
