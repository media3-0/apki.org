module Course
  class UserCourse
    include Mongoid::Document
    include Mongoid::Timestamps

    field :achievements, type: Array, :default => []
    field :quizzes, type: Array, :default => []
    field :exercises, type: Hash, :default => {}
    field :lessons, type: Array, :default => []

    belongs_to :user
    belongs_to :course_course_datum, :class_name => 'Course::CourseDatum'
  end
end