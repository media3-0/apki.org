module Course
  class Quiz
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash, :default => {}

    belongs_to :course_lesson, :class_name => 'Course::Lesson'
  end
end