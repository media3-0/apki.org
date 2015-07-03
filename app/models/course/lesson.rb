module Course
  class Lesson
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash

    belongs_to :course_course_datum, :class_name => 'Course::CourseDatum'

    has_many :course_exercises, :class_name => 'Course::Exercise'
    has_many :course_quizs, :class_name => 'Course::Quiz'
  end
end