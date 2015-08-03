module Course
  class Lesson
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash, default: {}

    belongs_to :course_course_datum, class_name: 'Course::CourseDatum'

    has_many :course_exercises, class_name: 'Course::Exercise', dependent: :destroy
    has_many :course_quizs, class_name: 'Course::Quiz', dependent: :destroy

    def parent_id
      course_course_datum.id.to_s
    end
  end
end
