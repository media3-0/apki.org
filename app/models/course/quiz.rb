module Course
  class Quiz
    include Mongoid::Document
    include Mongoid::Timestamps

    field :data, type: Hash, :default => {}

    belongs_to :course_lesson, :class_name => 'Course::Lesson'

    def parent_id
      course_lesson.id.to_s
    end
  end
end