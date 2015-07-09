module Course
  class CourseChecker
    def self.check_lesson(lesson, user_course)
      lesson.course_exercises.each { |exercise| return false unless user_course.exercises.has_key? exercise.id.to_s }
      lesson.course_quizs.each { |quiz| return false unless user_course.quizzes.include? quiz.id.to_s }
      true
    end
  end
end