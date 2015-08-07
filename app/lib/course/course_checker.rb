module Course
  class CourseChecker
    def self.check_lesson(lesson, user_course)
      lesson.course_exercises.each { |exercise| return false unless user_course.exercises.key? exercise.id.to_s }
      return false unless user_course.quizzes.include? lesson.id.to_s
      true
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
      conn = Faraday.new(url: Rails.configuration.x.compile_api_host) do |faraday|
        faraday.request :url_encoded
        faraday.response :logger
        faraday.adapter Faraday.default_adapter
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

      check_compiled_code data['code'], exercise.data['expected_result_expr'], output, data['user_input']
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
  end
end
