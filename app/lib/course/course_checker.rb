module Course
  class CourseChecker
    def self.check_lesson(lesson, user_course)
      lesson.course_exercises.each { |exercise| return false unless user_course.exercises.has_key? exercise.id.to_s }
      return false unless user_course.quizzes.include? lesson.id.to_s
      true
    end

    def self.check_quizes(lesson, data, json_response)
      json_response['quizzes'] = {}
      lesson_correct = true
      lesson.course_quizs.each do |quiz|
        unless check_quiz data, json_response, quiz
          lesson_correct = false
        end
      end
      lesson_correct
    end

    def self.check_excercise(exercise, data, json_response, output)
      conn = Faraday.new(:url => 'http://localhost:4000') do |faraday|
        faraday.request  :url_encoded
        faraday.response :logger
        faraday.adapter  Faraday.default_adapter
      end

      response = conn.post do |req|
        req.url '/compile'
        req.headers['Content-Type'] = 'application/json'
        req.body = { :lang => exercise.data['lang'], :code => data['code'], :user_input => data['user_input'] }.to_json
      end

      output = JSON.parse response.body.to_s
      json_response['output'] = output
      if exercise.data['expected_output'] == output['output']
        return true
      else
        return false
      end
    end

    private
    def self.check_quiz(data, json_response, quiz)
      correct = true
      unless data['quizzes'].has_key? quiz.id.to_s
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
  end
end