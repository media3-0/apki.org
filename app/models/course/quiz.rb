class Course::Quiz
  include Mongoid::Document
  include Mongoid::Timestamps
  include JSONDataModel

  field :data, type: Hash

  belongs_to :course_lesson, :class_name => 'Course::Lesson'
end
